function timePeriodBelongs (mainPeriod, belongPeriod) {
    let mainPeriodStart = mainPeriod[0]
    let mainPeriodEnd = mainPeriod[1]

    let belongPeriodStart = belongPeriod[0]
    let belongPeriodEnd = belongPeriod[1]

    if (belongPeriodStart > mainPeriodStart && belongPeriodEnd < mainPeriodEnd) {
        return {result: 'belong', belongPeriod}
    } else {
        if (belongPeriodStart > mainPeriodStart && belongPeriodEnd > mainPeriodEnd) {
            belongPeriod[1] = mainPeriodEnd
            return {result: 'partly belong', reformedData: belongPeriod}
        } else if (belongPeriodStart < mainPeriodStart && belongPeriodEnd < mainPeriodEnd) {
            belongPeriod[0] = mainPeriodStart
            return {result: 'partly belong', reformedData: belongPeriod}
        } else {
            return {false: 'not belong'}
        }
    }
}

export default {timePeriodBelongs}