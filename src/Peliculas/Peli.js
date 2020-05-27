import React, { useEffect, useState } from 'react'
import { Pelicula } from './CompStyle'
import { useParams, withRouter } from 'react-router-dom'
import { motion } from "framer-motion"
import axios from 'axios';
import Menu from './Menu';

import { FaLongArrowAltLeft } from "react-icons/fa";

function Peli({ history }) {
    const { idPeli } = useParams()
    const [miPeli, setMiPeli] = useState({})

    const [generos, setGeneros] = useState(['uno', 'dos'])

    useEffect(() => {

        const misGeneros = (results, genres) => {
            let gP = results[0].genre_ids.map((x) => {
                for (const gen of genres) {
                    if (x === gen.id) {
                        return gen.name
                    }
                }
            })
            return gP
        }

        const fetchData = async () => {
            try {
                let r = await axios(`https://api.themoviedb.org/3/search/multi?api_key=dfec46579f0de27eddf537907d657311&language=en-US&query=${idPeli}&page=1&include_adult=false`);

                let g = await axios(`https://api.themoviedb.org/3/genre/movie/list?api_key=dfec46579f0de27eddf537907d657311&language=en-US`);

                let { data: { results } } = r;
                let { data: { genres } } = g;

                let gg = await misGeneros(results, genres)

                setGeneros(gg)
                setMiPeli(results[0])
            } catch{
                alert('No encontrado, intenta de nuevo.')
            }
        }

        fetchData();

        return () => {

        }
    }, [setMiPeli, setGeneros,idPeli])

    const mover: Varianst = {
        inicial: { opacity: 0, x: 0 },
        animar: {
            opacity: 1, x: 0,
            transition: {
                duration: .4,
                ease: [0.45, 0, 0.55, 1],
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        },
        exit: {
            opacity: 0, x: 0,
            transition: {
                duration: .4,
                ease: [0.45, 0, 0.55, 1],
                staggerChildren: 0.1,
                staggerDirection: -1,
                delay: .6
            }
        }
    }

    const aparecer: Varianst = {
        inicial: { opacity: 0, y: -20 },
        animar: {
            opacity: 1, y: 0,
            transition: {
                duration: .4,
                ease: [0.37, 0, 0.63, 1]
            }
        },
        exit: {
            opacity: 0, y: 20,
            transition: {
                duration: .3,
                ease: [0.37, 0, 0.63, 1]
            }
        }
    }

    return (
        <Pelicula hola={`https://image.tmdb.org/t/p/original/${miPeli.backdrop_path}`}
            initial='inicial' animate='animar' exit='exit' variants={mover} hey="1"
        >
            <Menu />
            <motion.div className='poster' variants={aparecer}>
                <img className="este" alt={`bien`} src={`https://image.tmdb.org/t/p/w500/${miPeli.poster_path}`} />
            </motion.div>
            <div className='review' >
                <div>
                    <motion.span variants={aparecer} >
                        <FaLongArrowAltLeft onClick={() => history.goBack()} />
                    </motion.span>

                    <motion.h1 variants={aparecer}>{miPeli.original_title || miPeli.original_name}</motion.h1>
                    <motion.p variants={aparecer}>
                        {generos.map((x, key) =>
                            <b key={key}>{x}</b>
                        )}
                    </motion.p>
                    <motion.p variants={aparecer}>
                        {miPeli.overview}
                    </motion.p>
                </div>
            </div>
        </Pelicula>
    )
}

export default withRouter(Peli)
