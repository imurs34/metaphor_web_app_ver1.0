from keybert import KeyBERT

highlighted = 'A DNA sequence is a specific lineup of chemical base pairs along its strand.'
kw_model = KeyBERT()
keywords = kw_model.extract_keywords(highlighted, keyphrase_ngram_range=(1, 1), stop_words=None)

print("keywords:", keywords)


keyword = keywords[0][0]

property_of_metaphor = ""
if highlighted != keyword:
    property_of_metaphor = highlighted
    
print("keyword:", keyword)
print("property_of_metaphor:", property_of_metaphor)
