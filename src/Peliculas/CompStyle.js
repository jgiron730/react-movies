import styled, { createGlobalStyle } from 'styled-components'

import { motion } from "framer-motion"
const colors = {
    mBlack: '#222',
    black: '#111',
    white: '#edf2f4',
    pureWhite: '#FFF'
}

export const themeDark = {
    bg: colors.black,
    color: colors.white
};
export const themeLight = {
    bg: colors.white,
    color: colors.black
};

export const GlobalStyle = createGlobalStyle`

html, body, address, blockquote, div, dl, form, h1, h2, h3, h4, h5, h6, ol, ul, p, pre, table, dd, dt, li, tbody, td, tfoot, th, thead, tr, button, del, ins, map, object, a, abbr, acronym, b, bdo, big, br, cite, code, dfn, em, i, img, kbd, q, samp, small, h4, strong, sub, sup, tt, var, legend, fieldset {
    margin: 0;
    padding: 0;
}
ul{list-style:none}
body{background: ${props => props.theme.bg};padding: 0; transition: ease .5s; 
font-family: 'Oswald', sans-serif;
/* font-family: 'Roboto', sans-serif; */
}
h1{margin-bottom:10px}
p{line-height: 22px}
img{ width:100%; display:block; }
`

export const Nav = styled.nav`
    font-size:20px; padding:0 10px;
    display: flex; justify-content: space-between;

    a{color:${p => p.theme.color};}
    svg{font-size:34px}
    ul{ display: flex; align-items:center;
        li{position:relative; margin-left: 6px; 

            a{text-decoration:none; display:block; z-index:5; position:relative;
              padding: 6px 10px; font-size:14px; box-sizing:border-box;
              color:${p => p.theme.color};
              :after{transition:.2s ease; position:absolute; left:0; bottom:0px; content:'' ; height: 2px; width:0%; background:rgb(255,64,0);;
               }
              :hover:after {width:100%;}
            }
        }        
    }

    .aqui { font-weight:700;
        :after{width:100%;}
    }
    @media (max-width:1024px ){
        padding:0px;
    }
`

export const Lista = styled(motion.ul)`
    display: grid; grid-template-columns: repeat(4, 1fr);
    padding: 0 50px; gap:40px;
    grid-template-rows: 100vh;
    grid-auto-rows: auto;

    > li:first-child{grid-column:1/5; position:relative; height:100vh; padding: 30px 0 50px 0;
        box-sizing:border-box;
        header{ height:100%; display:grid; gap:20px; grid-template-rows: auto 1fr;
            div{overflow:hidden; position:relative;
                
                a{z-index:5;
                    :before{content:''; position:absolute; height:100%; width:100%;
                background: rgb(255,64,0); z-index:2;
                background: linear-gradient(12deg, rgba(255,64,0,1) 0%, rgba(255,64,0,0) 30%); 
                }
                }
            }
        }        

        img{height:100%; object-fit:cover;}
        h4{z-index:5; position:absolute; bottom:10%; left:5%;
            color:${colors.white}; font-size: 6vw;
        }
    }

    @media (max-width:1024px ) and (orientation: portrait){
        grid-template-columns: repeat(3, 1fr);

        > li:first-child{grid-column:1/4;}
    }

    @media (max-width:600px ) {
        grid-template-columns: repeat(2, 1fr);
        padding: 0 20px; gap:20px;
        > li:first-child{grid-column:1/3; position:relative;
            h4{font-size:10vw}
        }
    }
`

export const Pelicula = styled(motion.div)`

    position:relative;
    display: grid; gap:50px; height:100vh; padding:50px; box-sizing:border-box;
    grid-template-columns: 1fr 1fr; 
    grid-template-rows: auto 1fr;
    align-items:center;

    background-image:url(${p => p.hola});
    background-repeat:no-repeat;
    background-size:cover;
    background-position:center;

    nav{grid-column:1/3; z-index:2}    
    .poster{ text-align:right; z-index:2;
        img{width:auto; display:inline-block }
    }
    .review{justify-self: start; z-index:2;
         div{width:60%;color: ${p => p.theme.color};
            h1{font-size:3.5vw; line-height:3vw; margin-bottom:20px;}
            span{font-size:3vw; color:rgb(255,64,0); position:relative; cursor: pointer;}
            p{margin-bottom:20px}  
            b{color:rgb(255,64,0); padding: 20px 10px 10px 0; margin-top:30px}
         }
    }

    :after{content:''; position:absolute; height:100%; width:100%; z-index:1; background: rgb(255,64,0);
    background: linear-gradient(7deg, rgba(255,64,0,1) 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.8) 70%, rgba(0,0,0,1) 100%);
    }
    @media (max-width:1366px ) {        
        .poster{
            img{width:60% }
        }
        .review{justify-self: start; z-index:2;
         div{width:80%;
            
         }
        }
    }

    @media (max-width:1366px )  and (orientation: portrait){
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        align-items:start;
        nav{grid-column:1; z-index:2}  
        .poster{ text-align:center; z-index:2;
            img{width:50%; display:inline-block }
        }
        .review{justify-self: start; z-index:2;
            div{width:100%;
                h1{font-size:5.5vw; line-height:5vw; }
                span{font-size:5vw; }
            }
        } 
    }

    @media (max-width:850px )  and (orientation: landscape){
        height:auto;
    }
    @media (max-width:600px ) {
        height:auto;
        padding: 50px 20px; gap:50px;
        
        nav{grid-column:1/2;}
        .poster{ 
            img{width:90%; }
        }
        .review{
            div{
                h1{font-size:10vw; line-height:10vw;}
                span{font-size:10vw;}  
            }
        }
    }

`