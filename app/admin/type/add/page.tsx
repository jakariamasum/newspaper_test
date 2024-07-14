"use client";
import axiosPublic from "@/lib/axiosPublic";
import { ChangeEvent, useState } from "react";
import { toast, Toaster } from "sonner";

const IndexPage: React.FC = () => {
  const [language, setLanguage] = useState({
    language_name: "English",
    language_code: "en",
  });
  const handleCreateLanguage = async () => {
    console.log(language);
    try {
      await axiosPublic.post("/language", language);
      toast.success("Successfully created!");
    } catch (error) {
      console.log(error);
      toast.warning("Failed to create language!");
    }
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setLanguage({
      language_code: e.target.value,
      language_name: selectedOption.text,
    });
  };

  return (
    <>
      <div className=" max-w-xl mx-auto my-4">
        <div className="w-full">
          <div className="mb-4">
            <p>Language</p>
            <select
              className="p-2 mt-2 w-full outline-none rounded-md"
              value={language.language_code}
              onChange={handleLanguageChange}
            >
              <option value="af">Afrikaans</option>
              <option value="sq">Albanian</option>
              <option value="am">Amharic</option>
              <option value="ar">Arabic</option>
              <option value="hy">Armenian</option>
              <option value="as">Assamese</option>
              <option value="ay">Aymara</option>
              <option value="az">Azerbaijani</option>
              <option value="bm">Bambara</option>
              <option value="eu">Basque</option>
              <option value="be">Belarusian</option>
              <option value="bn">Bengla</option>
              <option value="bho">Bhojpuri</option>
              <option value="bs">Bosnian</option>
              <option value="bg">Bulgarian</option>
              <option value="ca">Catalan</option>
              <option value="ceb">Cebuano</option>
              <option value="ny">Chichewa</option>
              <option value="cn">Chinese (Simplified)</option>
              <option value="ctw">Chinese (Traditional)</option>
              <option value="co">Corsican</option>
              <option value="hr">Croatian</option>
              <option value="cs">Czech</option>
              <option value="da">Danish</option>
              <option value="dv">Dhivehi</option>
              <option value="doi">Dogri</option>
              <option value="nl">Dutch</option>
              <option value="en">English</option>
              <option value="eo">Esperanto</option>
              <option value="et">Estonian</option>
              <option value="ee">Ewe</option>
              <option value="fil">Filipino</option>
              <option value="fi">Finnish</option>
              <option value="fr">French</option>
              <option value="fy">Frisian</option>
              <option value="gl">Galician</option>
              <option value="ka">Georgian</option>
              <option value="de">German</option>
              <option value="el">Greek</option>
              <option value="gn">Guarani</option>
              <option value="gu">Gujarati</option>
              <option value="ht">Haitian Creole</option>
              <option value="ha">Hausa</option>
              <option value="haw">Hawaiian</option>
              <option value="he">Hebrew</option>
              <option value="hi">Hindi</option>
              <option value="hmn">Hmong</option>
              <option value="hu">Hungarian</option>
              <option value="is">Icelandic</option>
              <option value="ig">Igbo</option>
              <option value="ilo">Ilocano</option>
              <option value="id">Indonesian</option>
              <option value="ga">Irish</option>
              <option value="it">Italian</option>
              <option value="ja">Japanese</option>
              <option value="jv">Javanese</option>
              <option value="kn">Kannada</option>
              <option value="kk">Kazakh</option>
              <option value="km">Khmer</option>
              <option value="rw">Kinyarwanda</option>
              <option value="kok">Konkani</option>
              <option value="ko">Korean</option>
              <option value="kri">Krio</option>
              <option value="ku">Kurdish (Kurmanji)</option>
              <option value="ckb">Kurdish (Sorani)</option>
              <option value="ky">Kyrgyz</option>
              <option value="lo">Lao</option>
              <option value="la">Latin</option>
              <option value="lv">Latvian</option>
              <option value="ln">Lingala</option>
              <option value="lt">Lithuanian</option>
              <option value="lg">Luganda</option>
              <option value="lb">Luxembourgish</option>
              <option value="mk">Macedonian</option>
              <option value="mai">Maithili</option>
              <option value="mg">Malagasy</option>
              <option value="ms">Malay</option>
              <option value="ml">Malayalam</option>
              <option value="mt">Maltese</option>
              <option value="mi">Maori</option>
              <option value="mr">Marathi</option>
              <option value="mni">Meiteilon (Manipuri)</option>
              <option value="lus">Mizo</option>
              <option value="mn">Mongolian</option>
              <option value="my">Myanmar (Burmese)</option>
              <option value="ne">Nepali</option>
              <option value="no">Norwegian</option>
              <option value="or">Odia (Oriya)</option>
              <option value="om">Oromo</option>
              <option value="ps">Pashto</option>
              <option value="fa">Persian</option>
              <option value="pl">Polish</option>
              <option value="pt">Portuguese</option>
              <option value="pa">Punjabi</option>
              <option value="qu">Quechua</option>
              <option value="ro">Romanian</option>
              <option value="ru">Russian</option>
              <option value="sm">Samoan</option>
              <option value="sa">Sanskrit</option>
              <option value="gd">Scots Gaelic</option>
              <option value="nso">Sepedi</option>
              <option value="sr">Serbian</option>
              <option value="st">Sesotho</option>
              <option value="sn">Shona</option>
              <option value="sd">Sindhi</option>
              <option value="si">Sinhala</option>
              <option value="sk">Slovak</option>
              <option value="sl">Slovenian</option>
              <option value="so">Somali</option>
              <option value="es">Spanish</option>
              <option value="su">Sundanese</option>
              <option value="sw">Swahili</option>
              <option value="sv">Swedish</option>
              <option value="tg">Tajik</option>
              <option value="ta">Tamil</option>
              <option value="tt">Tatar</option>
              <option value="te">Telugu</option>
              <option value="th">Thai</option>
              <option value="ti">Tigrinya</option>
              <option value="ts">Tsonga</option>
              <option value="tr">Turkish</option>
              <option value="tk">Turkmen</option>
              <option value="tw">Twi</option>
              <option value="uk">Ukrainian</option>
              <option value="ur">Urdu</option>
              <option value="ug">Uyghur</option>
              <option value="uz">Uzbek</option>
              <option value="vi">Vietnamese</option>
              <option value="cy">Welsh</option>
              <option value="xh">Xhosa</option>
              <option value="yi">Yiddish</option>
              <option value="yo">Yoruba</option>
              <option value="zu">Zulu</option>
            </select>
          </div>
          <div className="border-2 border-main border-dashed rounded-md p-2 my-8">
            <button
              onClick={() => handleCreateLanguage()}
              type="submit"
              className="bg-main flex items-center justify-center w-full text-white px-4 py-2 rounded-md"
            >
              Publish
            </button>
          </div>
        </div>
      </div>
      <Toaster richColors position="top-right" />
    </>
  );
};
export default IndexPage;
