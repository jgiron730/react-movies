import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Link, useParams } from "react-router-dom";
import { Lista } from './CompStyle'
import { motion } from "framer-motion"

import noImage from './imgs/noimage.jpg'

import Menu from './Menu';

function Seccion() {
    const { listaTop } = useParams()
    const [peli, setPeli] = useState({ ultimas: [] })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const r = await axios(`https://api.themoviedb.org/3/tv/${listaTop}?api_key=dfec46579f0de27eddf537907d657311&language=en-US&page=1`);
                console.log(r.data.results[0])

                setPeli({ ultimas: r.data.results })

            } catch{
                alert('No encontrado, intenta de nuevo.')
            }
        }

        fetchData();
    }, [listaTop])

    const mover: Varianst = {
        inicial: { opacity: 0, x: 0 },
        animar: {
            opacity: 1, x: 0,
            transition: {
                duration: .4,
                ease: [0.45, 0, 0.55, 1]
            }
        },
        exit: {
            opacity: 0, x: 0,
            transition: {
                duration: .4,
                ease: [0.45, 0, 0.55, 1]
            }
        }
    }

    return (
        <Lista key="2" initial={'inicial'} animate={'animar'} exit={'exit'} variants={mover}>
            {
                peli.ultimas.map((m, index) => {
                    let nombrePelicula = (m.original_title || m.original_name).replace(/%| /g, '-').toLowerCase();
                    if (index === 0) {
                        var imagen = <header>
                            <Menu />
                            <div>
                                <h4> {m.name} {m.title}</h4>
                                <Link to={`/results/${nombrePelicula}`}>
                                    {m.backdrop_path ?
                                        <img alt={m.title} src={`https://image.tmdb.org/t/p/original/${m.backdrop_path}`} />
                                        : <img alt={m.title} src={noImage} />}

                                </Link>
                            </div>
                        </header>
                    } else {
                        imagen = <Link to={`/results/${nombrePelicula}`}><img alt={m.title} src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} /> </Link>
                    }
                    return <motion.li key={index} > {imagen} </motion.li>
                }

                )}
        </Lista>
    )
}

export default Seccion
