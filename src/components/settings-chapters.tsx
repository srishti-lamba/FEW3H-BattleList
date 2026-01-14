import {useEffect, useRef} from 'react';

export interface Chapter {
    number: number;
    name: string;
    part: number;
    byleth: number;
    final: boolean;
}

interface ChapterSelectionProps {
    show: boolean;
    name: string;
    chapterStart: number;
    setChapterStart: any;
    chapterEnd: number;
    setChapterEnd: any;
    allChapters: Chapter[];
}

export const ChapterSelection = ({show, name, chapterStart, setChapterStart, chapterEnd, setChapterEnd, allChapters} : ChapterSelectionProps) => {

    const btnStartUp = useRef(null);
    const btnStartDown = useRef(null);
    const btnEndUp = useRef(null);
    const btnEndDown = useRef(null);

    const handleClick_startUp = ( (btn : any) => {
        console.log("Start Up clicked!")
        setChapterStart(btn.current.value);
    })

    // Run once
    useEffect(() => {
    }, [])

    // useEffect(() => {

    //     console.log("Difficulty changed: " + difficulty)

    //     if (btnEasy.current == null) {
    //         return
    //     }

    //     let arr : any[] = [btnEasy, btnNorm, btnHard, btnMadd]
    //     arr.map( (b) => {(b.current as HTMLButtonElement).classList.remove("active");})

    //     let btn : any = null;
    //     switch (difficulty) {
    //         case "easy":      btn = btnEasy; break;
    //         case "normal":    btn = btnNorm; break;
    //         case "hard":      btn = btnHard; break;
    //         case "maddening": btn = btnMadd; break;
    //     }
    //     (btn.current as HTMLButtonElement).classList.add("active");

    // }, [difficulty])

    if (!show) {
        return <></>;
    }

    return (
        <>
            <span className="section">
                <span className="prompt">{name}</span>
                {/* <span className="buttons">
                    <button 
                        ref={btnEasy} 
                        value="easy"
                        className={difficulty==="easy" ? "active" : ""}
                        onClick={() => handleClick_difficulty(btnEasy)} >
                        Easy
                    </button>
                    <button 
                        ref={btnNorm}
                        value="normal"
                        className={difficulty==="normal" ? "active" : ""}
                        onClick={() => handleClick_difficulty(btnNorm)} >
                        Normal
                    </button>
                    <button 
                        ref={btnHard} 
                        value="hard"
                        className={difficulty==="hard" ? "active" : ""}
                        onClick={() => handleClick_difficulty(btnHard)} >
                        Hard
                    </button>
                    <button 
                        ref={btnMadd} 
                        value="maddening"
                        className={difficulty==="maddening" ? "active" : ""}
                        onClick={() => handleClick_difficulty(btnMadd)} >
                        Maddening
                    </button>
                </span> */}
            </span>
        </>
    )
}