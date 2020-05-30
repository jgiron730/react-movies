import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link,HashRouter } from "react-router-dom";
import { GlobalStyle, themeDark, Lista } from './CompStyle'
import { AnimatePresence,motion } from "framer-motion"

import './StylePeliculas.scss';

import Peli from './Peli';
import Menu from './Menu';
import Seccion from './Seccion';

function Pelis() {

    const [peli, setPeli] = useState({ ultimas: [] })

    useEffect(() => {

        const fetchData = async () => {
            try {
                const r = await axios(`https://api.themoviedb.org/3/trending/all/day?api_key=dfec46579f0de27eddf537907d657311`);

                console.log(r.data.results[18].original_title)

                setPeli({ ultimas: r.data.results })

            } catch{
                alert('No encontrado, intenta de nuevo.')
            }
        }

        fetchData();
    }, [])

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
        <ThemeProvider theme={themeDark}>
            <GlobalStyle />

            <HashRouter basename='/'>
                <Route
                    render={({ location }) => (
                        <AnimatePresence exitBeforeEnter initial={false}>
                            <Switch location={location} key={location.pathname}>
                                <Route exact path="/">
                                    <Lista key="2" initial={'inicial'} animate={'animar'} exit={'exit'} variants={mover}>
                                        {
                                            
                                            peli.ultimas.map((m, index) => {
                                                let nombrePelicula = (m.original_title || m.original_name).replace(/%| /g, '-').toLowerCase();
                                                if (index === 0) {
                                                    var imagen = <header>
                                                        <Menu/>
                                                        <div>
                                                            <h4> {m.name} {m.title}</h4>
                                                        <Link to={`/results/${nombrePelicula}`}>
                                                            <img alt={m.title} src={`https://image.tmdb.org/t/p/original/${m.backdrop_path}`} />
                                                        </Link>
                                                        </div>
                                                    </header>
                                                } else {
                                                    imagen = <Link to={`/results/${nombrePelicula}`}><img alt={m.title} src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`} /> </Link>
                                                }
                                                return <motion.li key={index} > {imagen} </motion.li>
                                            }

                                            )
                                        }
                                    </Lista>
                                </Route>
                                <Route path="/results/:idPeli">
                                    <Peli />
                                </Route>
                                <Route path="/top/:listaTop">
                                    <Seccion />
                                </Route>
                            </Switch>
                        </AnimatePresence>
                    )}
                />
            </HashRouter>

        </ThemeProvider >
    )
}

export default Pelis
