const maxElementsForSuggestion = 5;

const inputWithAllWordsId = 'WithAllWordsInputId';
const inputDivWithAllWordsId = 'WithAllWordsId';
const suggestionWithAllWordsGroupId = 'suggestionWithAllWordsGroup';
const suggestionWithAllWordsId = 'suggestionsForAllWords';

const inputSomeWordsId = 'SomeWordsInputId';
const inputDivSomeWordsId = 'SomeWordsId';
const suggestionSomeWordsGroupId = 'suggestionSomeWordsGroup';
const suggestionSomeWordsId = 'suggestionsForSomeWords';

const inputWithoutWordsId = 'WithoutWordsInputId';
const inputDivWithoutWordsId = 'WithoutWordsId';
const suggestionWithoutWordsGroupId = 'suggestionWithoutWordsGroup';
const suggestionWithoutWordsId = 'suggestionsForWithoutWords';

function SetSuggestionsForWithAllWords() { setAutocompleteEvents(inputWithAllWordsId, suggestionWithAllWordsGroupId, suggestionWithAllWordsId, WithAllWordsHistoryFilterKey); }
function SetSuggestionsForSomeWords() { setAutocompleteEvents(inputSomeWordsId, suggestionSomeWordsGroupId, suggestionSomeWordsId, SomeWordsHistoryFilterKey); }
function SetSuggestionsForWithoutWords() { setAutocompleteEvents(inputWithoutWordsId, suggestionWithoutWordsGroupId, suggestionWithoutWordsId, WithoutWordsHistoryFilterKey); }

function setAutocompleteEvents(inputId, suggestionGroupId, suggestionGroupCreatedId, key) {
    var element = document.getElementById(inputId);

    if (!isNotEmpty(element)) return;

    var divInput = element.parentNode;
    var newUserKey = JSON.parse(userKey);

    //Mostrar listado de sugerencias al dar click:
    divInput.addEventListener('click', function () {

        const existSuggestions = document.getElementById(suggestionGroupCreatedId);

        if (existSuggestions != null) return;

        var listWithDates = getSuggestionsInCache(key, newUserKey.Email);
        var listFiltered = getSuggestionsFilteredByWord(list = listWithDates);

        if (listFiltered.length <= 0) return;

        var suggestionList = listFiltered.slice(0, maxElementsForSuggestion);

        clearLimitValuesInSuggestionList(listFiltered, key, newUserKey.Email);
        createSuggestionHtml(inputId, suggestionList, suggestionGroupId, suggestionGroupCreatedId);
    });

    //Filtrar listado de sugerencias al escribir:
    divInput.addEventListener('keyup', function (e) {

        //ArrowUp
        if (e.keyCode == 38) {
            //Aqui se puede agregar una logica de animacion para seleccionar sugerencias con teclado
        }
        //ArrowDown
        else if (e.keyCode == 40) {
            //Aqui se puede agregar una logica de animacion para seleccionar sugerencias con teclado
        }
        else {
            //Filtrado de recomendaciones al escribir:
            const existSuggestions = document.getElementById(suggestionGroupCreatedId);

            if (existSuggestions != null) closeList(suggestionGroupCreatedId);

            const wordForFilter = document.getElementById(inputId).value;

            var listWithDates = getSuggestionsInCache(key, newUserKey.Email);
            var listFiltered = getSuggestionsFilteredByWord(list = listWithDates, wordForFilter);

            if (listFiltered.length <= 0) return;

            var suggestionList = listFiltered.slice(0, maxElementsForSuggestion);

            createSuggestionHtml(inputId, suggestionList, suggestionGroupId, suggestionGroupCreatedId);
        }
    });
}

function createSuggestionHtml(inputId, suggestionList, suggestionGroupId, suggestionGroupCreatedId) {
    var suggestions = document.createElement('div');
    suggestions.setAttribute('id', suggestionGroupCreatedId);
    suggestions.className = 'suggestions-group-class';

    const parentNode = document.getElementById(suggestionGroupId);

    if (parentNode == null) return;

    parentNode.appendChild(suggestions);

    insertSuggestionsInHtml(inputId, suggestions, suggestionList, suggestionGroupCreatedId);
}
function insertSuggestionsInHtml(inputId, suggestions, suggestionList, suggestionGroupCreatedId) {
    var input = document.getElementById(inputId);
    var divInput = input.parentNode;

    //Iteración para cada una de las sugerencias:
    for (let i = 0; i < suggestionList.length; i++) {
        suggestion = document.createElement('div');
        suggestion.innerHTML = suggestionList[i].value;

        //Evento de cuando se le da click a alguna sugerencia:
        suggestion.addEventListener('click', function () {
            var chipInstance = M.Chips.getInstance($(`#${divInput.id}`));

            chipInstance.addChip({ tag: this.innerHTML });
            divInput.value = "";
            input.value = "";

            closeList(suggestionGroupCreatedId);
        });

        suggestion.className = 'suggestion-class';
        suggestions.appendChild(suggestion);
    }
}
function clearLimitValuesInSuggestionList(listFiltered, key, email) {

    //Limpieza de elemento antiguos -> Eliminación de elementos restantes
    if (listFiltered.length > (maxElementsForSuggestion * 14)) {
        var valuesToSetInHistoryCache = listFiltered.slice(0, maxElementsForSuggestion);
        var valuesToSetInHistoryCacheString = valuesToSetInHistoryCache.map(x => `${x.value}${splitKey}${x.date}`).join(splitKey);

        setGenericHistoryCache(key, valuesToSetInHistoryCacheString, email);
    }
}
function getSuggestionsInCache(key, email) {

    //Extracción de los datos de cache. Llegan como Tupla (valor, fecha)
    var historyCacheModel = getGenericHistoryCache(key, email);
    var suggestionsForFilter = isNotEmpty(historyCacheModel) ? historyCacheModel.split(splitKey) : [];

    if (suggestionsForFilter.length <= 0) return [];

    //filtrado de sugerencias por solo valor y no fecha:
    var listWithDates = suggestionsForFilter
        .map((x, i) => ({ value: x, index: i }))
        .filter(x => x.index % 2 == 0)
        .map(x => ({ value: x.value, date: suggestionsForFilter.at(x.index + 1) }));

    return listWithDates;
}
function getSuggestionsFilteredByWord(list, word) {

    if (!isNotEmpty(list)) return [];

    var listFiltered = [];

    if (isNotEmpty(word)) {
        var wordStandard = word.trim().toUpperCase();

        listFiltered = list.filter(x => {
            var wordInList = x.value.trim().toUpperCase();

            return wordInList.includes(wordStandard.toUpperCase());
        });
    }
    else {
        listFiltered = list;
    }

    if (listFiltered.length <= 0) return [];

    return listFiltered.sort(function (a, b) { return new Date(b.date) - new Date(a.date); });
}

function CloseWithAllWordsSuggestions(e) {
    if (e.target.id != suggestionWithAllWordsGroupId &&
        e.target.id != inputDivWithAllWordsId &&
        e.target.id != inputWithAllWordsId
    ) {
        closeList(suggestionWithAllWordsId);
    }
}
function CloseSomeWordsSuggestions(e) {
    if (e.target.id != suggestionSomeWordsGroupId &&
        e.target.id != inputDivSomeWordsId &&
        e.target.id != inputSomeWordsId
    ) {
        closeList(suggestionSomeWordsId);
    }
}
function CloseWithoutWordsSuggestions(e) {
    if (e.target.id != suggestionWithoutWordsGroupId &&
        e.target.id != inputDivWithoutWordsId &&
        e.target.id != inputWithoutWordsId
    ) {
        closeList(suggestionWithoutWordsId);
    }
}
function CloseOthersSuggestions(currentSuggestionId) {
    switch (currentSuggestionId) {
        case suggestionWithAllWordsId:
            closeList(suggestionSomeWordsId);
            closeList(suggestionWithoutWordsId);
            break;
        case suggestionSomeWordsId:
            closeList(suggestionWithAllWordsId);
            closeList(suggestionWithoutWordsId);
            break;
        case suggestionWithoutWordsId:
            closeList(suggestionWithAllWordsId);
            closeList(suggestionSomeWordsId);
            break;
        default:
            closeList(suggestionWithAllWordsId);
            closeList(suggestionSomeWordsId);
            closeList(suggestionWithoutWordsId);
            break;
    }
}
function closeList(suggestionlistId) {
    let suggestions = document.getElementById(suggestionlistId);

    if (suggestions) suggestions.parentNode.removeChild(suggestions);
}