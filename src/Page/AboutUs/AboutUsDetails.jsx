import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const AboutUsDetails = () => {
    const {id} = useParams();
    const [allData, setAllData] = useState(null);
    useEffect(() => {
        fetch('/we.json')
        .then(res => res.json())
        .then(data => {
            const selected = data.find(item => item.id === id)
            setAllData(selected)
        })
    }, [id]);
    console.log(allData);
    return (
        <div>
            
        </div>
    );
};

export default AboutUsDetails;