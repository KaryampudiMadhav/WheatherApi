import { useEffect, useState } from "react";
import axios from "axios";
import "./wheather.css";
function App() {
    const [city, setCity] = useState("Chirala");
    const [w, setW] = useState(null);
    const [err, setErr] = useState("");
    const [temp, setTemp] = useState("");
    const [fetchWeather, setFetchWeather] = useState(false);
    useEffect(()=>{
        const bgImage = 'url("/defaultImages.jpg")'
        document.body.style.backgroundImage = bgImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    },[])
    function updateBackgroundImage(d) {
        let bgImage = '';
        switch (d) {
            case "clear":
                bgImage = 'url("/clear.webp")';
                break;
            case "clouds":
                bgImage = 'url("/clouds1.webp")';
                break;
            case "rain":
                bgImage = 'url("/rainy.webp")';
                break;
            case "snow":
                bgImage = 'url("/snow.webp")';
                break;
            case "thunderstorm":
                bgImage = 'url("/thunder.webp")';
                break;
            case "mist":
                bgImage = 'url("/sroms.webp")'
                break;
            default:
                bgImage = 'url("/defaultImages.jpg")';
        }
        document.body.style.backgroundImage = bgImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }
    useEffect(() => {
        if (!fetchWeather) return;

        const fetchData = async () => {
            try {
                setErr("");
                const apiKey = "c8ab49dc1e74c92d14caabd854cd8628";
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
                );

                console.log(response.data);
                setW(response.data);
                setTemp(response.data.main.temp);

                if (response.data.weather && response.data.weather[0]) {
                    updateBackgroundImage(response.data.weather[0].main.toLowerCase());
                }
            } catch (err) {
                console.log(err);
                setErr(err);
            } finally {
                setFetchWeather(false);
            }
        };

        fetchData();
    }, [fetchWeather, city]);
    useEffect(() => {
        const now = new Date();
        const hour = now.getHours();
        const imgElement = document.querySelector(".imgNames");

        if (imgElement) {
            imgElement.src = hour >= 6 && hour < 18 ? "sunny.gif" : "moon.webp";
        }
    }, [w]);

    const cityChange = (e) => {
        setCity(e.target.value);
    };

    const Submit = (e) => {
        e.preventDefault();
        if (city.trim() === "") {
            setErr("Enter the City");
        } else {
            setFetchWeather(true);
        }
    };
    return (
        <>
            <div className="totalcontent">
                <div className="content">
                    <div className="form">
                        <form onSubmit={Submit}>
                            <input
                                type="text"
                                placeholder="Enter the City"
                                value={city}
                                onChange={cityChange}
                                className="search-bar"
                                required
                            />
                            <button className="searchButton" type="submit">
                                <img src="magnifying-glass.png" alt="search" className="searchimg" />
                            </button>
                        </form>
                    </div>
                    <div className="images">
                        <div className="data">{temp ? `${temp}°` : "Loading..."}</div>
                        <img src="" alt="weather icon" className="imgNames" />
                    </div>
                    {w && (
                        <div className="solution">
                            <div className="temperature">
                                <div>Temperature</div>
                                <div className="temp">{temp}<sup>o</sup></div>
                                <div className="mintem">{w.main.temp_min}<sup>o</sup></div>
                                <div className="max">{w.main.temp_max}<sup>o</sup></div>
                            </div>
                            <div className="windSpeed">
                                <div>WindSpeed</div>
                                <div className="temp">{w.wind.speed} m/s</div>
                            </div>
                            <div className="humidity">
                                <div>Humidity</div>
                                <div className="temp">{w.main.humidity} %</div>
                            </div>
                        </div>
                    )}
                    {err && (
                        <div className="error">
                            <div>Details</div>
                            <div className="weather">Weather = {err.message}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default App;
