import json
import re
from deep_translator import GoogleTranslator

def protect_vars(text):
    # Replace {{var}} with <span class="notranslate">{{var}}</span> to protect it
    # But deep-translator uses google translate which might mess up HTML.
    # Actually, Google Translate usually respects {{var}}. Let's just pass it directly.
    return text

def translate_dict(d, dest_lang, translator):
    translated_dict = {}
    for k, v in d.items():
        if isinstance(v, dict):
            translated_dict[k] = translate_dict(v, dest_lang, translator)
        elif isinstance(v, str):
            if v.strip() == "":
                translated_dict[k] = v
                continue
            try:
                translated_dict[k] = translator.translate(v)
                print(f"Translated [{k}]: {translated_dict[k]}")
            except Exception as e:
                print(f"Error translating '{v}': {e}")
                translated_dict[k] = v
        else:
            translated_dict[k] = v
    return translated_dict

def main():
    with open('locales/en.json', 'r', encoding='utf-8') as f:
        en_data = json.load(f)
    
    print("Translating to Japanese...")
    ja_translator = GoogleTranslator(source='en', target='ja')
    ja_data = translate_dict(en_data, 'ja', ja_translator)
    with open('locales/ja.json', 'w', encoding='utf-8') as f:
        json.dump(ja_data, f, ensure_ascii=False, indent=2)
        
    print("Translating to Korean...")
    ko_translator = GoogleTranslator(source='en', target='ko')
    ko_data = translate_dict(en_data, 'ko', ko_translator)
    with open('locales/ko.json', 'w', encoding='utf-8') as f:
        json.dump(ko_data, f, ensure_ascii=False, indent=2)
        
    print("Translation complete!")

if __name__ == "__main__":
    main()
