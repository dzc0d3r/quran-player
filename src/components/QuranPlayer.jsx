import { useState, useEffect } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward, faPlay } from '@fortawesome/free-solid-svg-icons'
import './QuranPlayer.scss'






const QuranPlayer = () => {

    const apiBaseUrl = "https://api.quran.gading.dev/surah/"
    const [surahs, setSurahs] = useState([])


    let audio = document.querySelector('audio');
    let ayah = document.querySelector('.ayah');


    const AlertSwal = withReactContent(Swal)
    useEffect(() => {
        axios.get(apiBaseUrl)
            .then((response) => { setSurahs(response.data.data) })



    }, [])




    let data = []

    const handleSurah = async (index) => {
        let ayahsText = []
        let ayahsAudios = []



        await axios.get(`${apiBaseUrl}${index + 1}`)
            .then((response) => { data = (response.data.data) })
            .catch(function (error) {
                console.log(error.toJSON());
            })

        data.verses.forEach(verse => {
            ayahsText.push(verse.text.arab);
            ayahsAudios.push(verse.audio.primary);
        });
        let ayahIndex = 0
        changeAyah(ayahIndex)

        audio.addEventListener('ended', () => {
            ayahIndex++;

            if (ayahIndex < ayahsAudios.length) {
                changeAyah(ayahIndex);


            } else if (ayahIndex == ayahsAudios.length) {

                AlertSwal.fire(
                    '   إنتهت السورة 🕋',
                    '  لا تنسونا من صالح دعائكم 😄🤲',
                    'success'
                )
                ayahsText = []
                ayahsAudios = []
                changeAyah(ayahIndex)
                audio.pause()



            } else {

                ayahIndex = 0;
            }
        });
        function changeAyah(index) {
            audio.src = ayahsAudios[index];
            ayah.innerHTML = ayahsText[index];
        }

    }






    return (
        <div className="container">
            <div className="player">
                <div className="ayah">

                    إِضغطْ عَلى السُّورة للإستماعِ إليها





                </div>
                <audio className="quranPlayer" controls autoPlay></audio>
                <div className="buttons">
                    <div className="icons next"><FontAwesomeIcon icon={faForward} /></div>
                    <div className="icons play"><FontAwesomeIcon icon={faPlay} /></div>
                    <div className="icons prev"><FontAwesomeIcon icon={faBackward} /></div>
                </div>

            </div>

            <div className="surahs">

                {
                    surahs.map((data, index) => (

                        <div key={index} onClick={() => handleSurah(index)}>
                            <p> {data.name.long}</p>


                            <p>{data.name.transliteration.en}</p>
                        </div>


                    ))
                }


            </div>

        </div>

    )
}

export default QuranPlayer