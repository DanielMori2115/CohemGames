function addCloseSuggestionEvent() {

    //General Click in the page
    document.body.addEventListener('click', e => {
        CloseWithAllWordsSuggestions(e);
        CloseSomeWordsSuggestions(e);
        CloseWithoutWordsSuggestions(e);
    })

    //General Tab in the page
    document.body.addEventListener('keyup', e => {
        if (e.keyCode == 9) { CloseOthersSuggestions(e.target.id); }
    })
}

// (A) CHIPS
document.addEventListener('DOMContentLoaded', function () {
    console.log('document was not ready, place code here');

    var newUserKey = JSON.parse(userKey);
    var lastResultModel = getModelLastResultCache(newUserKey.Email);

    SetChips(newUserKey);
    SetSuggestionsForWithAllWords();
    SetSuggestionsForSomeWords();
    SetSuggestionsForWithoutWords();
    addCloseSuggestionEvent();

    //Evento de agregación para componentes html con clase .tooltipped
    var elems = document.querySelectorAll('.tooltipped');

    M.Tooltip.init(elems);
});