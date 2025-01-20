var initFilters = {
    "CodeFilter": null,
    "RoomFilter": null,
    "IssueFilter": null,
    "AuthorFilter": null,
    "documentCommentFilter": null,
    "HashtagFilter": null,
    "SubHashtagFilter": null,
    "HashtagDocFilter": null,
    "SubHashtagDocFilter": null,
    "SubHashtagCheckDocFilter": null,
    "OwnHashtagsFilter": false,
    "OwnSubHashtagsFilter": false,
    "AssignHashtagsFilter": false,
    "AssignSubHashtagsFilter": false,
    "FavoriteFilter": false,
    "PublicationDateOrigin": null,
    "PublicationDateDestiny": null,
    "WithAllWords": "",
    "SomeWords": "",
    "WithoutWords": "",
    "HashTagId": null,
    "SubHashTagId": null,
    "CurrentPage": 0
};

const WithAllWordsHistoryFilterKey = 0;
const SomeWordsHistoryFilterKey = 1;
const WithoutWordsHistoryFilterKey = 2;

const IsModelCache = 3;
const IsHistoryCache = 4;

function notExistsCacheModel() { return !isNotEmpty(localStorage.Model) }
function notExistsCacheHistory() { return !isNotEmpty(localStorage.History); }

function isTheSameCacheFilter(filter1, filter2) {
    try {
        if (!isNotEmpty(filter1) || !isNotEmpty(filter2)) return false;
        if (!isNotEmpty(filter2.WithAllWords) && !isNotEmpty(filter1.WithAllWords)) filter1.WithAllWords = filter2.WithAllWords;
        if (!isNotEmpty(filter2.SomeWords) && !isNotEmpty(filter1.SomeWords)) filter1.SomeWords = filter2.SomeWords;
        if (!isNotEmpty(filter2.WithoutWords) && !isNotEmpty(filter1.WithoutWords)) filter1.WithoutWords = filter2.WithoutWords;
        if ((!isNotEmpty(filter2.SubHashtagFilter) || filter2.SubHashtagFilter.length <= 0) && !isNotEmpty(filter1.SubHashtagFilter)) filter1.SubHashtagFilter = filter2.SubHashtagFilter;

        var result = JSON.stringify(filter1) === JSON.stringify(filter2);

        return result;
    }
    catch (exception) {
        return false;
    }
}
function omit(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}

function clearCacheModel(email) { setModelCache(email, initFilters, needClear = true); }
function clearOthersCacheModel(email) {
    var sessionValue = getMainValueInCache(IsModelCache);

    if (!isNotEmpty(sessionValue)) return;

    var listFromCache = JSON.parse(sessionValue);

    var listFiltered = listFromCache.filter(x => x.Email != email);

    if (listFiltered.length <= 0) return;

    listFiltered.forEach(item => { clearCacheModel(item.Email); });
}
function clearCacheHistory(email) { setHistoryCache(email, initFilters); }

function getModelCache(email) { return getCacheValue(email, IsModelCache, getFilterValue = true); }
function getModelLastResultCache(email) { return getCacheValue(email, IsModelCache, getFilterValue = false); }
function getHistoryCache(email) { return getCacheValue(email, IsHistoryCache, getFilterValue = true); }
function getCacheValue(email, cacheFlag, getFilterValue = true) {

    var sessionValue = getMainValueInCache(cacheFlag);

    if (!isNotEmpty(sessionValue)) return "";

    var listFromCache = JSON.parse(sessionValue);

    var listFiltered = listFromCache.filter(x => x.Email == email);

    if (listFiltered.length <= 0) return "";

    var cacheValue = listFiltered[0];

    return getFilterValue == true ? cacheValue.Filters : cacheValue.LastResult;
}

function getGenericHistoryCache(filterKey, email) {
    var historyCacheModel = getHistoryCache(email);

    switch (filterKey) {
        case WithAllWordsHistoryFilterKey:
            return historyCacheModel.WithAllWords;

        case SomeWordsHistoryFilterKey:
            return historyCacheModel.SomeWords;

        case WithoutWordsHistoryFilterKey:
            return historyCacheModel.WithoutWords;

        default:
            return historyCacheModel.WithAllWords;
    }
}
function setGenericHistoryCache(filterKey, valueString, email) {
    var historyCacheModel = getHistoryCache(email);

    switch (filterKey) {
        case WithAllWordsHistoryFilterKey:
            historyCacheModel.WithAllWords = valueString;
            break;
        case SomeWordsHistoryFilterKey:
            historyCacheModel.SomeWords = valueString;
            break;
        case WithoutWordsHistoryFilterKey:
            historyCacheModel.WithoutWords = valueString;
            break;
        default:
            historyCacheModel.WithAllWords = valueString;
            break;
    }

    setHistoryCache(email, historyCacheModel);
}

function setModelCache(email, filters, needClear = false) { setCacheValue(email, filters, IsModelCache, needClear); }
function setModelLastResultCache(email, filters, lastResult, view) {
    if (isNotEmpty(email)) {

        //Set Model like Array:
        if (!isNotEmpty(getMainValueInCache(IsModelCache))) { setMainValueInCache(IsModelCache, []); }

        var listFromCache = JSON.parse(getMainValueInCache(IsModelCache));
        var existsCacheFlag = getCacheValue(email, IsModelCache);

        if (isNotEmpty(existsCacheFlag)) {
            filters.WithAllWords = isNotEmpty(filters.WithAllWords) ? filters.WithAllWords : '';
            filters.SomeWords = isNotEmpty(filters.SomeWords) ? filters.SomeWords : '';
            filters.WithoutWords = isNotEmpty(filters.WithoutWords) ? filters.WithoutWords : '';

            var existsItem = listFromCache
                .map((x, i) => ({ value: x, index: i }))
                .filter(x => x.value.Email == email)[0];

            var item = existsItem.value;

            item.LastResult = {
                Filters: filters,
                Value: lastResult,
                View: view
            };

            listFromCache[existsItem.index] = item;
        }
        else {
            var item = getInitSchemeForCacheValue(email);

            item.LastResult = {
                Filters: initFilters,
                Value: lastResult,
                View: view
            };

            listFromCache.push(item);
        }

        setMainValueInCache(IsModelCache, listFromCache);
    }
}
function setHistoryCache(email, filters) { setCacheValue(email, filters, IsHistoryCache); }
function setCacheValue(email, filters, cacheFlag, needClear = false) {
    if (isNotEmpty(email)) {

        if (!isNotEmpty(filters)) filters = initFilters;
        if (!isNotEmpty(getMainValueInCache(cacheFlag))) { setMainValueInCache(cacheFlag, []); }
        
        var listFromCache = JSON.parse(getMainValueInCache(cacheFlag));
        var existsCacheFlag = getCacheValue(email, cacheFlag);

        if (isNotEmpty(existsCacheFlag)) {
            var existsItem = listFromCache
                .map((x, i) => ({ value: x, index: i }))
                .filter(x => x.value.Email == email)[0];

            var item = existsItem.value;

            item.Filters = filters;

            if (needClear) item = getInitSchemeForCacheValue(email);

            listFromCache[existsItem.index] = item;
        }
        else {
            //Primera incialización para objetos vacios:
            var item = getInitSchemeForCacheValue(email);

            listFromCache.push(item);
        }

        setMainValueInCache(cacheFlag, listFromCache);
    }
}

function setMainValueInCache(cacheFlag, value) {
    if (cacheFlag == IsModelCache) {
        localStorage.Model = JSON.stringify(value);
    }
    else if (cacheFlag == IsHistoryCache) {
        localStorage.History = JSON.stringify(value);
    }
}
function getMainValueInCache(cacheFlag) {
    return cacheFlag == IsModelCache ? localStorage.Model : localStorage.History;
}
function getInitSchemeForCacheValue(email) {
    return {
        Email: email,
        Filters: initFilters,
        LastResult: {
            View: null,
            Filters: initFilters,
            Value: null
        }
    };
}