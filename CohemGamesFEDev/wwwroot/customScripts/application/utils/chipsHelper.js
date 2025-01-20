// (A) CHIPS
function SetChips(newUserKey) {
    //Iniciacion de modelos cache:
    if (notExistsCacheModel()) clearCacheModel(newUserKey.Email); 
    if (notExistsCacheHistory()) clearCacheHistory(newUserKey.Email); 
    
    //Evento de agregación para componentes html con clase .chips
    $('#WithAllWordsId').chips({
        placeholder: 'Ingresa una palabra',
        secondaryPlaceholder: '+filtro',
        onChipAdd: onChipAddEventForAllWords,
        onChipDelete: onChipDeleteEventForAllWords,
        data: getChipsFromCacheToAllWordsFilter(newUserKey)
    });

    $('#SomeWordsId').chips({
        placeholder: 'Ingresa una palabra',
        secondaryPlaceholder: '+filtro',
        onChipAdd: onChipAddEventForSomeWords,
        onChipDelete: onChipDeleteEventForSomeWords,
        data: getChipsFromCacheToSomeWordsFilter(newUserKey)
    });

    $('#WithoutWordsId').chips({
        placeholder: 'Ingresa una palabra',
        secondaryPlaceholder: '+filtro',
        onChipAdd: onChipAddEventForWithoutWords,
        onChipDelete: onChipDeleteEventForWithoutWords,
        data: getChipsFromCacheToWithoutWordsFilter(newUserKey)
    });
}

function onChipAddEventForAllWords() {
    var newUserKey = JSON.parse(userKey);
    var cacheModel = getModelCache(newUserKey.Email);
    var historyModel = getHistoryCache(newUserKey.Email);

    var allChipsValues = getValuesFromChip('WithAllWordsId').split(splitKey);
  
    if (sessionStorage.viewKey != NEWS_VIEW) {
        var valuesFromCacheModel = isNotEmpty(cacheModel.WithAllWords) ? cacheModel.WithAllWords.split(splitKey) : [];
        var valuesFromHistoryModel = isNotEmpty(historyModel.WithAllWords) ? historyModel.WithAllWords.split(splitKey) : [];

        var valuesFromCacheModelString = getValuesForAddInCache(valuesFromCacheModel, allChipsValues);
        var valuesFromHistoryModelString = getValuesForAddInCache(valuesFromHistoryModel, allChipsValues);

        cacheModel.WithAllWords = valuesFromCacheModelString;
        historyModel.WithAllWords = valuesFromHistoryModelString;

        setModelCache(newUserKey.Email, cacheModel);
        setHistoryCache(newUserKey.Email, historyModel);
    }
}
function onChipAddEventForSomeWords() {
    var newUserKey = JSON.parse(userKey);
    var cacheModel = getModelCache(newUserKey.Email);
    var historyModel = getHistoryCache(newUserKey.Email);

    var allChipsValues = getValuesFromChip('SomeWordsId').split(splitKey);

    if (sessionStorage.viewKey != NEWS_VIEW) {
        var valuesFromCacheModel = isNotEmpty(cacheModel.SomeWords) ? cacheModel.SomeWords.split(splitKey) : [];
        var valuesFromHistoryModel = isNotEmpty(historyModel.SomeWords) ? historyModel.SomeWords.split(splitKey) : [];

        var valuesFromCacheModelString = getValuesForAddInCache(valuesFromCacheModel, allChipsValues);
        var valuesFromHistoryModelString = getValuesForAddInCache(valuesFromHistoryModel, allChipsValues);

        cacheModel.SomeWords = valuesFromCacheModelString;
        historyModel.SomeWords = valuesFromHistoryModelString;

        setModelCache(newUserKey.Email, cacheModel);
        setHistoryCache(newUserKey.Email, historyModel);
    }
}
function onChipAddEventForWithoutWords() {
    var newUserKey = JSON.parse(userKey);
    var cacheModel = getModelCache(newUserKey.Email);
    var historyModel = getHistoryCache(newUserKey.Email);

    var allChipsValues = getValuesFromChip('WithoutWordsId').split(splitKey);

    if (sessionStorage.viewKey != NEWS_VIEW) {
        var valuesFromCacheModel = isNotEmpty(cacheModel.WithoutWords) ? cacheModel.WithoutWords.split(splitKey) : [];
        var valuesFromHistoryModel = isNotEmpty(historyModel.WithoutWords) ? historyModel.WithoutWords.split(splitKey) : [];

        var valuesFromCacheModelString = getValuesForAddInCache(valuesFromCacheModel, allChipsValues);
        var valuesFromHistoryModelString = getValuesForAddInCache(valuesFromHistoryModel, allChipsValues);

        cacheModel.WithoutWords = valuesFromCacheModelString;
        historyModel.WithoutWords = valuesFromHistoryModelString;

        setModelCache(newUserKey.Email, cacheModel);
        setHistoryCache(newUserKey.Email, historyModel);
    }
}
function onChipDeleteEventForAllWords() {
    var newUserKey = JSON.parse(userKey);
    var cacheModel = getModelCache(newUserKey.Email);

    var allChipsValues = getValuesFromChip('WithAllWordsId').split(splitKey);
    var valuesFromCache = isNotEmpty(cacheModel.WithAllWords) ? cacheModel.WithAllWords.split(splitKey) : [];

    var valuesFromCacheString = getValuesForNotDeleInCache(valuesFromCache, allChipsValues);

    cacheModel.WithAllWords = valuesFromCacheString;

    setModelCache(newUserKey.Email, cacheModel);
}
function onChipDeleteEventForSomeWords() {
    var newUserKey = JSON.parse(userKey);
    var cacheModel = getModelCache(newUserKey.Email);

    var allChipsValues = getValuesFromChip('SomeWordsId').split(splitKey);
    var valuesFromCache = isNotEmpty(cacheModel.SomeWords) ? cacheModel.SomeWords.split(splitKey) : [];

    var valuesFromCacheString = getValuesForNotDeleInCache(valuesFromCache, allChipsValues);

    cacheModel.SomeWords = valuesFromCacheString;

    setModelCache(newUserKey.Email, cacheModel);
}
function onChipDeleteEventForWithoutWords() {
    var newUserKey = JSON.parse(userKey);
    var cacheModel = getModelCache(newUserKey.Email);

    var allChipsValues = getValuesFromChip('WithoutWordsId').split(splitKey);
    var valuesFromCache = isNotEmpty(cacheModel.WithoutWords) ? cacheModel.WithoutWords.split(splitKey) : [];

    var valuesFromCacheString = getValuesForNotDeleInCache(valuesFromCache, allChipsValues);

    cacheModel.WithoutWords = valuesFromCacheString;

    setModelCache(newUserKey.Email, cacheModel);
}

function getChipsFromCacheToAllWordsFilter(newUserKey) {
    var valuesWithAllFilter = [];

    var cacheValue = getModelCache(newUserKey.Email);
    
    if (isNotEmpty(cacheValue.WithAllWords) && sessionStorage.viewKey != NEWS_VIEW) {

        var valuesArrayWithAllFilter = cacheValue.WithAllWords.split(splitKey)

        valuesWithAllFilter = valuesArrayWithAllFilter.map((str) => ({ tag: str }))
    }

    return getOnlyChipsValuesNotDate(valuesWithAllFilter);
}
function getChipsFromCacheToSomeWordsFilter(newUserKey) {
    var valuesSomeWordsFilter = [];

    var cacheValue = getModelCache(newUserKey.Email);

    if (isNotEmpty(cacheValue.SomeWords) && sessionStorage.viewKey != NEWS_VIEW) {

        var valuesArraySomeWordsFilter = cacheValue.SomeWords.split(splitKey)

        valuesSomeWordsFilter = valuesArraySomeWordsFilter.map((str) => ({ tag: str }))
    }

    return getOnlyChipsValuesNotDate(valuesSomeWordsFilter);
}
function getChipsFromCacheToWithoutWordsFilter(newUserKey) {
    var valuesWithoutFilter = [];

    var cacheValue = getModelCache(newUserKey.Email);

    if (isNotEmpty(cacheValue.WithoutWords) && sessionStorage.viewKey != NEWS_VIEW) {

        var valuesArrayWithoutFilter = cacheValue.WithoutWords.split(splitKey)

        valuesWithoutFilter = valuesArrayWithoutFilter.map((str) => ({ tag: str }))
    }

    return getOnlyChipsValuesNotDate(valuesWithoutFilter);
}

function getValuesFromChip(chipId) {
    var newArrayWithDates = [];

    var instance = M.Chips.getInstance($(`#${chipId}`));

    if (!isNotEmpty(instance)) return newArrayWithDates;

    let wawChips = instance.chipsData;

    wawChips.forEach(item => {
        var valueToAdd = item.tag.trim();

        newArrayWithDates.push(valueToAdd);
    });

    var response = newArrayWithDates.join(splitKey);

    return response;
}
function getValuesForAddInCache(valuesFromCache, allChipsValues) {

    if (!isNotEmpty(valuesFromCache)) return;

    var onlyChipValuesFromCacheModel = getOnlyChipsValuesNotDate(valuesFromCache);
    var valuesNewsToAdd = allChipsValues.filter(function (chip) { return onlyChipValuesFromCacheModel.indexOf(chip) == -1; })

    var newArrayWithDates = [];

    valuesNewsToAdd.forEach(valueToAdd => {
        var registerDate = getCurrentDateString();

        newArrayWithDates.push(valueToAdd);
        newArrayWithDates.push(registerDate);
    });

    valuesFromCache.AddRange(newArrayWithDates);

    var valuesFromCacheString = valuesFromCache.join(splitKey);

    return valuesFromCacheString;
}
function getValuesForNotDeleInCache(valuesFromCache, allChipsValues) {
    if (!isNotEmpty(valuesFromCache)) return;

    var onlyChipValuesFromCacheModel = getOnlyChipsValuesNotDate(valuesFromCache);

    var valuesToNotDeleteFrommCache = onlyChipValuesFromCacheModel
        .filter(function (chip) { return allChipsValues.indexOf(chip) != -1; });

    var valueToPersist = [];

    valuesFromCache.forEach((value, i) => {

        var existValueInCache = valuesToNotDeleteFrommCache.some(x => x == value); 

        if (!existValueInCache) return;

        valueToPersist.push(value);
        valueToPersist.push(valuesFromCache.at(i + 1));
    });

    var valuesFromCacheString = valueToPersist.join(splitKey);

    return valuesFromCacheString;
}
function convertStringToChipsArrayString(arrayString) {
    if (!isNotEmpty(arrayString)) return [];

    return convertStringToChipsArray(arrayString).join(splitKey);
}
function convertStringToChipsArray(arrayString) {
    if (!isNotEmpty(arrayString)) return [];

    return getOnlyChipsValuesNotDate(arrayString.split(splitKey));
}
function getOnlyChipsValuesNotDate(array) { return array.filter((_, i) => i % 2 == 0); }