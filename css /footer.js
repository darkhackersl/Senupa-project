body
{
    margin: 0;
    font-family: 'Lato', sans-serif;
}

#containerFooter
{
    width: 100%;
    background-color: rgb(29, 29, 29);
    color: white;
    letter-spacing: 1px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    text-transform: uppercase;
    font-size: 15px;
    padding: 15px 300px;
    box-sizing: border-box;
}
#containerFooter h3:hover, #containerFooter p:hover
{
    color: lightslategray;
    cursor: pointer;
}
#webFooter
{
    padding-top: 30px;
    font-size: 12px;
}
#credit 
{
    width: 100%;
    margin: auto;
    padding: 20px 0;
    text-align: center;
    background-color: rgb(29, 29, 29);
    color: white;
    font-size: 11px;
    letter-spacing: 1px;
}

#credit a
{
    color: white;
    text-decoration: none;
    position: relative;
}
#credit a::after
{
content: "";
background: white;
mix-blend-mode: exclusion;
width: calc(100% + 18px);
height: 0;
position: absolute;
bottom: -4px;
left: -10px;
transition: all .3s cubic-bezier(0.445, 0.05, 0.55, 0.95);
}
#credit a:hover::after
{
    height: calc(100% + 8px)
}

/* ----------------------------- MEDIA QUERY --------------------------- */

@media(max-width: 1350px)
{
    #containerFooter
    {
        padding: 15px 200px;
    }
}
@media(max-width: 1166px)
{
    #containerFooter
    {
        padding: 15px 100px;
    }
}
@media(max-width: 950px)
{
    #containerFooter
    {
        padding: 15px 50px;
    }
}
@media(max-width: 850px)
{
    #containerFooter
    {
        font-size: 13px;
    }
    #webFooter
    {
        font-size: 10px;
    }
}
@media(max-width: 750px)
{
    #containerFooter
    {
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 15px 100px;
    }
    #webFooter
    {
        padding: 15px 20px;
    }
}
@media(max-width: 540px)
{
    #containerFooter
    {
        padding: 0 25px;
    }
