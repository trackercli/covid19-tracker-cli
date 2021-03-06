import { generateAsciichart } from "../../libs/generateAsciichart";
import { generatePlainOutput } from "./generatePlainOutput";
import { countryInfoPlain, globalInfoPlain } from "./plainParser";
import { getHistorical } from "../../getInformation";

/**
 * globalHistory shows a tablechart of the cases of all the countries
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * and a graph of a country's cases
 * @param mode Mode that the user wants to query, must be: "cases" | "deaths" | "recoveries"
 * @param quiet tells the response to be in quiet mode or not
 */
export const globalHistoryPlain: (
    mode: "cases" | "deaths" | "recovered",
    quiet: boolean
) => Promise<string> = async (mode, quiet) => {
    // Get summary info
    const info = await globalInfoPlain();

    // Get data from API
    const { date, chartData } = await getHistorical(mode);

    // Generate historical graph
    const chart = generateAsciichart(chartData, true, 7);

    return generatePlainOutput(info, `Global Historical Chart`, quiet, [
        date,
        chart,
    ]);
};

/**
 * historyPerCountry shows a tablechart of the <mode> of a country
 * Shows Cases, Deaths, Recovered, Active, Cases/Million
 * Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * @param country country code or country name that the user wants to query
 * @param mode Mode that the user wants to query, must be: "cases" | "deaths" | "recoveries"
 * @param quiet tells the response to be in quiet mode or not
 */

export const historyPerCountryPlain: (
    country: string,
    mode: "cases" | "deaths" | "recovered",
    quiet: boolean
) => Promise<string> = async (country, mode, quiet) => {
    // Get summary info about a country
    const info = await countryInfoPlain(country);
    const { apiCountryName, formalCountryName } = info;

    const { date, chartData } = await getHistorical(mode, apiCountryName);

    // Generate historical graph
    const chart = generateAsciichart(chartData, true, 7);

    return generatePlainOutput(info, `${formalCountryName} Chart`, quiet, [
        date,
        chart,
    ]);
};

/**
 *  informationPerCountry tracks the info of a country
 * 	Shows Cases, Deaths, Recovered, Active, Cases/Million
 *  Today Cases, Today Deaths, Critical, Mortality %, Recovery in a chart
 * 	@param country country code or country name that the user wants to query
 *  @param quiet tells the response to be in quiet mode or not
 */
export const informationPerCountryPlain: (
    country: string,
    quiet: boolean
) => Promise<string> = async (country, quiet) => {
    const info = await countryInfoPlain(country);
    return generatePlainOutput(info, `${info.formalCountryName} Update`, quiet);
};

/**
 *  globalInformation tracks the info of all countries
 * 	Shows Cases, Deaths, Recovered, Mortality %, Recovered% in a chart
 *  @param quiet tells the response to be in quiet mode or not
 */
export const globalInformationPlain: (
    quiet: boolean
) => Promise<string> = async (quiet) => {
    const info = await globalInfoPlain();
    return generatePlainOutput(info, "Global Update", quiet);
};
