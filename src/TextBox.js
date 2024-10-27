import './TextBox.css';

export default function TextBox ({text, speaker}) {
    

    return(
        <div className="text-cont">
            <h2>{speaker}</h2>
            <div className="line"></div>
            <p>{text}</p>
        </div>
    );
}