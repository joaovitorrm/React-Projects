import React, { useState, useEffect, createRef, useRef } from "react";

import Glass from "./Glass";

interface Glasses {
    glassRef : React.RefObject<HTMLDivElement>
    selected : boolean
    hasBall : boolean
    handleClick : (hasBall : boolean) => void
    animationClick : (glassRef : React.RefObject<HTMLDivElement>) => void
}


const Puzzle: React.FC = () => {

    const [glasses, setGlasses] = useState<Glasses[]>([]);
    const [glassesAmount, setGlassesAmount] = useState(3);
    const speed = useRef(700);
    const steps = useRef({actualStep : 0, maxSteps : 3});
    const score = useRef({best : 0, actual : 0});
    const [isShuffling, setIsShuffling] = useState(false);
    const shouldShuffle = useRef(false);

    const checkClick = (hasBall : boolean) => {
        setTimeout(() => {
            if (steps.current.actualStep >= steps.current.maxSteps) {
                steps.current.actualStep = 0;
                speed.current -= 15;
                if (hasBall) {
                    score.current.actual += 1;
                    if (score.current.actual > score.current.best) score.current.best = score.current.actual;
                    if (score.current.actual % 3 === 0) steps.current.maxSteps += 1;
                    if (score.current.actual % 5 === 0) {
                        shouldShuffle.current = true;
                        setGlassesAmount(prev => prev + 1)
                        return;
                    }
                    setIsShuffling(true);
                    return;
                }
                setGlassesAmount(0);
                speed.current = 700;
                score.current.actual = 0;
            };
        }, 400)
    }

    const animationClick = (glassRef : React.RefObject<HTMLDivElement>) => {
        setGlasses(prev => prev.map(glass => glass.glassRef === glassRef ? {...glass, selected : !glass.selected} : glass));
    }
    
    useEffect(() => {

        if (glassesAmount === 0) setGlassesAmount(3);

        setGlasses([]);
        const newGlasses : Glasses[] = Array.from({length : glassesAmount}, (_, index) => ({
            glassRef : createRef(),
            selected : index === 0 ? true : false,
            hasBall : index === 0 ? true : false,
            handleClick : checkClick,
            animationClick : animationClick
        }));
        setGlasses([...newGlasses]);

    }, [glassesAmount])

    useEffect(() => {

        if (glasses.length === 0) return;

        if (shouldShuffle.current) {
            shouldShuffle.current = false;
            setTimeout(() => {
                setIsShuffling(true);
            }, 500)
        }

        if (!isShuffling) return;

        if (steps.current.actualStep >= steps.current.maxSteps) {
            setGlasses(prev => prev.map(glass => ({...glass, canSelect : true})))
            setIsShuffling(false);
            return;
        };

        // Generate random order
        const randomOrder = Array.from({length : glassesAmount}, (_, i) => i).sort(() => Math.random() - 0.5);
        while (randomOrder.every((value, index) => value === index)) {
            randomOrder.sort(() => Math.random() - 0.5);
        }

        // Move glasses with animation
        glasses.forEach((glass, index) => {
            glass.glassRef.current!.animate([
                {
                    left : "0",
                    top : "0"
                },
                {
                    left : (glasses[randomOrder.indexOf(index)].glassRef.current!.offsetLeft - glass.glassRef.current!.offsetLeft) + "px",
                    top : (glasses[randomOrder.indexOf(index)].glassRef.current!.offsetTop - glass.glassRef.current!.offsetTop) + "px"
                }],
                {
                    duration: speed.current,
                    easing: "ease-in-out",
                    iterations: 1
                }
            ).onfinish = () => {
                if (index === glassesAmount - 1) {
                    steps.current.actualStep++;
                    const newGlasses = randomOrder.map(value => glasses[value]);                        
                    setGlasses([...newGlasses]);
                }
            }
        })

    }, [glasses])

    useEffect(() => {
        if (!isShuffling) return;

        glasses.forEach(glass => glass.glassRef.current!.classList.remove("selected"));
        setTimeout(() => {
            steps.current.actualStep = 0;
            const newGlasses = glasses.map(glass => ({...glass, selected : false}));
            setGlasses([...newGlasses]);
        }, 400);

    }, [isShuffling])

    return (
        <div className="puzzle-container">
            <div className="score-container">
                <div className="score">
                    <span>{score.current.actual}</span>
                    <h5>Score</h5>
                </div>
                <div className="best">
                    <span>{score.current.best}</span>
                    <h5>Best</h5>
                </div>
            </div>
            <div className="puzzle">
                {glasses.map((glass, index) => (
                    <Glass                    
                        key={index}
                        glassRef={glass.glassRef}
                        selected={glass.selected}
                        hasBall={glass.hasBall}
                        canSelect={!isShuffling}
                        handleClick={glass.handleClick}
                        animationClick={glass.animationClick}
                    />
                ))}
            </div>
            <button className="start-btn" onClick={() => setIsShuffling(true)}>Start</button>
        </div>
    )
}

export default Puzzle;