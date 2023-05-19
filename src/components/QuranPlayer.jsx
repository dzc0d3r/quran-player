import { useState, useEffect, useRef } from "react"
import axios from "axios"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './QuranPlayer.scss'



const apiBaseUrl = "https://api.quran.gading.dev/surah/"
const QuranPlayer = () => {

    const [surahs, setSurahs] = useState([])
    const [ayahsText, setAyahsText] = useState([])
    const [ayahsAudios, setAyahsAudios] = useState([])

    const audioRef = useRef(null)
    let audio = document.querySelector('audio');
    let ayah = document.querySelector('.ayah');




    const AlertSwal = withReactContent(Swal)









    useEffect(() => {
        axios.get(apiBaseUrl)
            .then((response) => { setSurahs(response.data.data) })



    }, [])



    let ayahIndex = 0
    const handleSurah = async (index) => {



        let data = []



        await axios.get(`${apiBaseUrl}${index + 1}`)
            .then((response) => { data = (response.data.data) })
            .catch(function (error) {
                console.log(error.toJSON());
            })


        setAyahsAudios(await data.verses);
        setAyahsText(await data.verses);




        changeAyah(ayahIndex)


        audioRef.current.addEventListener('ended', () => {
            ayahIndex++;
            console.log(audioRef)
            if (ayahIndex < ayahsAudios.length) {
                changeAyah(ayahIndex);


            } else {
                AlertSwal.fire(
                    '   إنتهت السورة 🕋',
                    '  لا تنسونا من صالح دعائكم 😄🤲',
                    'success'
                )

            }
        });



    }
    async function changeAyah() {



        console.log(audio)
        console.log(ayahsAudios)
        audio.src = await ayahsAudios[ayahIndex].audio.primary;
        ayah.innerHTML = await ayahsText[ayahIndex].text.arab;


    }





    return (
        <div className="container">
            <div className="player">
                <div className="ayah">

                    إِضغطْ عَلى السُّورة للإستماعِ إليها





                </div>
                <audio ref={audioRef} className="quranPlayer" controls autoPlay></audio>
                <div className="buttons">
                    <div className="icons next">⏭️</div>
                    <div className="icons play">▶️</div>
                    <div className="icons prev">⏮️</div>
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