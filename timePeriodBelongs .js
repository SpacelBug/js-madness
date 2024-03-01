/**
 * Проверяет содержит ли mainPeriod belongPeriod
 * @param mainPeriod [date, date]
 * @param belongPeriod [date, date]
 * @returns {{result: string, reformedData}|{false: string}|{result: string, belongPeriod}}
 */
function timePeriodBelongs (mainPeriod, belongPeriod) {
    let mainPeriodStart = mainPeriod[0]
    let mainPeriodEnd = mainPeriod[1]

    let belongPeriodStart = belongPeriod[0]
    let belongPeriodEnd = belongPeriod[1]

    if (belongPeriodStart >= mainPeriodStart && belongPeriodEnd <= mainPeriodEnd) {
        return {result: 'belong', belongPeriod}
    } else {
        if (belongPeriodStart >= mainPeriodStart && belongPeriodEnd >= mainPeriodEnd) {
            belongPeriod[1] = mainPeriodEnd
            return {result: 'partly belong, end after main', reformedData: belongPeriod}
        } else if (belongPeriodStart <= mainPeriodStart && belongPeriodEnd <= mainPeriodEnd) {
            belongPeriod[0] = mainPeriodStart
            return {result: 'partly belong, start before main', reformedData: belongPeriod}
        } else {
            return {result: 'not belong'}
        }
    }
}

export default {timePeriodBelongs}