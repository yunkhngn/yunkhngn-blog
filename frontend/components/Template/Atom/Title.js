const Title = ({children, color}) => {
    return (
        <header id="heading">
            <h1 className={color === '#171717' ? "dark" : 'light'}>
                {children}
            </h1>
        </header>
    );
}

export default Title;