import axios, { AxiosResponse } from 'axios';
import { JSDOM } from 'jsdom';

import { Rank, Rider } from '../types/CyclingTypes.js';
import { memoryStats } from '../utils/statUtils.js';

/**
 * @param index The index of the page required (if set to in, rankings from 100 to 200 are returned)
 * @return Between 0 and 100 rankings
 * */
export async function getRankings(index: number): Promise<Rank[]> {
    const results: Rank[] = [];

    let response: AxiosResponse<unknown> | null = await axios.get(`https://www.procyclingstats.com/rankings.php?page=smallerorequal&offset=${index}00&filter=Filter`);

    if (typeof response?.data != 'string') {
        throw new Error('Unable to parse data from \'https://www.procyclingstats.com/rankings.php?page=smallerorequal&offset=${index}00&filter=Filter\' - it\'s not a string');
    }

    let doc: Document | null = new JSDOM(response?.data).window.document;
    response = null; // free memory asap

    const table: HTMLTableElement | null = doc.querySelector('table');
    doc = null; // free memory asap

    if (!table || !table.rows) {
        throw new Error('Unable to parse data from \'https://www.procyclingstats.com/rankings.php?page=smallerorequal&offset=${index}00&filter=Filter\' - ranking table not found');
    }
    if (table.rows.length === 0) {
        return [];
    }

    for (let j = 1; j < table.rows.length; j++) {
        const row: HTMLTableRowElement = table.rows[j];
        const cell: HTMLTableCellElement = row.cells[3];
        const href: string | undefined = cell.innerHTML.match(/<a[^>]* href="([^"]*)"/)?.[1];

        // if unable to parse a rank, skip it
        if (row.cells[0].textContent && href) results.push({
            rank: row.cells[0].textContent,
            riderLink: href
        });
    }

    const errorRate = (table.rows.length - results.length) / table.rows.length;
    if (errorRate > 0.1) {
        throw new Error(`Error rate while parsing ranks is too high (${errorRate})`);
    }

    return results;
}

/**
 * @param ranks The ranks objects, so you want the corresponding riders
 * @return between 0 and 100 rankings
 * */
export async function getRiders(ranks: Rank[]): Promise<Rider[]> {
    const riders: Promise<Rider | null>[] = [];

    for (let i = 0; i < ranks.length; i++) {
        riders.push(getRider(ranks[i]));
        if (i % 10 === 0) await new Promise(resolve => setTimeout(resolve, 500));
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await Promise.all(riders)).filter((e) => !!e).map((e) => e!);
}

/**
 * @param rank The rank object so you want the corresponding rider
 * @return between 0 and 100 rankings
 * */
async function getRider(rank: Rank): Promise<Rider | null> {
    const headers = {
        'Referer': 'https://www.procyclingstats.com/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    };
    let response: AxiosResponse<unknown> | null = await axios.get(`https://www.procyclingstats.com/${rank.riderLink}`, { headers: headers });

    if (typeof response?.data !== 'string') return null;

    let doc: Document | null = new JSDOM(response.data).window.document;
    response = null;

    const infoElement: Element | null = doc.getElementsByClassName('rdr-info-cont').item(0);
    const titleElement: HTMLHeadingElement | null = doc.querySelector('h1');
    doc = null;

    const ranking: string | undefined = infoElement?.innerHTML.match(/<a href="rankings\/me\/uci-individual">UCI World<\/a>[^<]*<\/div>[^<]*<div class="rnk[^"]*">(\d*)<\/div>/)?.[1];
    const age: string | undefined = infoElement?.innerHTML.match(/\((\d*)\)<br><b>Nationality/)?.[1];
    const country: string | undefined = infoElement?.innerHTML.match(/href="nation\/([^"]*)"/)?.[1];
    const weight: string | undefined = infoElement?.innerHTML.match(/<b>Weight:<\/b>\s*(\d*)\s*kg/)?.[1];
    const height: string | undefined = infoElement?.innerHTML.match(/<b>Height:<\/b>\s*(\d*.\d*)\s*m/)?.[1];

    const name: string | undefined = titleElement?.innerHTML.replace('  ', ' ');

    if (!height || !weight || !country || !age || !ranking || !name) {
        return null;
    }

    memoryStats();

    return {
        rank: parseInt(ranking),
        name: name,
        country: country,
        age: parseInt(age, 10),
        weight: parseInt(weight),
        height: parseFloat(height)
    };
}
