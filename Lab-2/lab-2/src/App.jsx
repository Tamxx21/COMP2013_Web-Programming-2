import "./App.css";
import Card from "./Components/Card";


function App() {
    return (
        <>
            <h1>Resort Lite</h1>
            <hr />
            <div className="main-container">
                <Card image="src\assets\images\1.jpg" place="Indonesia" venue="Gili Air Hotel" rating=" 4.8 ★" price="$589"/>
                <Card image="src\assets\images\2.jpg" place="Seychelles" venue="Hilton Resort" rating="4.2 ★" price="$629"/>
                <Card image="src\assets\images\3.jpg" place="US Virgin Islands" venue="Goa Resort" rating="3.5 ★" price="$485"/>
                <Card image="src\assets\images\4.jpg" place="Bahamas" venue="Kuredu Resort" rating="4.1 ★" price="$729"/>
                <Card image="src\assets\images\5.jpg" place="Mauritius" venue="Trou D'eau" rating="4.9 ★" price="$877"/>
                <Card image="src\assets\images\6.jpg" place="Bermuda" venue="Staniel Cay Hotel" rating="3.2 ★" price="$365"/>
            </div>
        </>
    );
}

export default App;
