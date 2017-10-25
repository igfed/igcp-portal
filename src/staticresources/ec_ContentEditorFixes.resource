#editorTitle {
    font-size: 1.1rem;
    font-weight: bold;
}

table.ocmsContentEditor > tbody > tr {
    font-size: 0.9rem;	/* 0.7em, are you kidding?! */
}

table.ocmsContentEditor tr.ocmsEditorSubtitle {
    font-size: 1.1rem;
}

table.ocmsContentEditor.ocmsContentEditorNested > tbody > tr > td {
    padding: 0.5rem 0;
    padding-left: 2px;
}

table.ocmsContentEditor tr p.ocmsHelpText,
.ocmsHelpText {
    margin-bottom: 0.5rem;
    line-height: 1.2;
}

.ocmsTextInputLrg.inline {
    display: block !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ocmsTextInputLrg {
    width: 35rem; /* ~560px vs only 290px */
}

/* 5f6060 on f5f5f5 is a WCAG pass, but do not like */
input,
textarea,
select,
.selected-page-label {
    color: black !important;
    font-size: 15px !important;
}

textarea {
    height: auto;   /* override 30px! */
    width: 35rem;
    font-family: Lato-Light;    /* overide slds rule */
}

input:focus,
textarea:focus,
select:focus {
    color: black;
    background-color: #f8f8f8;
    border-color: #696;
    box-shadow: 0 0 2px 1px #696;
}

/* language Selects shouldn’t be that different? */
div.inline select.noBorder {
    padding-left: 2px !important;
    border: 1px solid #b8b8b8 !important;
}

/* within page picker; not a really label! */
.selected-page-label {
    width: 35rem;
}

.ocmsContentEditor.ocmsContentEditorNested .ui-button {
    margin-top: 2px;
}

.container.image-selector,
.container.image-selector * {
    box-sizing: content-box;    /* old-school default, overriding slds border-box sizing */
}