import React,{useState,useEffect} from 'react';

const cardValues = ["A", "B", "C", "D", "E", "F", "G", "H"];
const generateShuffleCards = () => {
    const cards = [...cardValues,...cardValues]
    .sort(()=>Math.random() - 0.5)
    .map((value,i)=>({
        id: i,
        value,
        isFlipped: false,
        isMatched: false,
    }))
    return cards;
}
const MemoryGame = () => {
    const [cards, setCards] = useState(generateShuffleCards());
    const [flippedCards, setFlippedCards] = useState([]);
    const [attemps, setAttemps] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(()=>{
        if (flippedCards.length === 2) {
            setIsProcessing(true);
            setTimeout(checkForMath,800);
        }
    },[flippedCards]);

    const handleCardClick = (card) => {
        console.log("card clicked");
        
        if(isProcessing || card.isFlipped || card.isMatched) return;
        const updateCards = cards.map((e)=>
            e.id===card.id?{...card, isFlipped:true}:e
        );
        setCards(updateCards);
        setFlippedCards([...flippedCards,card]);
    }

    const checkForMath = () => {
        const [first, second] = flippedCards;
        if (first.value === second.value) {
            setCards((prev)=>
                prev.map((e)=>e.value === first.value?{...e,isMatched:true}:e)
            )
        }else{
            setTimeout(() => {
                setCards((prev)=>
                    prev.map((e)=>e.id === first.id || e.id === second.id ? {...e,isFlipped:false}:e)
                )
            }, 300);
        }
        setFlippedCards([]);
        setAttemps((prev)=>prev + 1);
        setIsProcessing(false);
    }

    const isGameEnd = cards.every((card)=>card.isMatched);

    const resetGame = () => {
        setCards(generateShuffleCards());
        setFlippedCards([]);
        setAttemps(0);
        setIsProcessing(false);
    }

  return (
    <>
        <p className="attemts-text">Your attempts : {attemps}</p>
        <div>
            <div className="c-container">
            {
                cards.map((card)=>(
                    <div key={card.id} className={`card ${card.isFlipped?'flipped':''} ${card.isMatched?'matched':''}`} onClick={()=>handleCardClick(card)}>
                        <div className="front"></div>
                        <div className="back">{card.isFlipped?card.value:''}</div>
                    </div>
                ))
            }
            </div>
        </div>
        {
            isGameEnd && (
                <div>
                    <p>You won in {attemps} attemps</p>
                    <button onClick={resetGame}>Try Again</button>
                </div>
            )
        }
    </>
  )
}

export default MemoryGame