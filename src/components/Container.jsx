const Container = ({ children }) => {
    return (
        <div
            className='
    max-w[1920px]
    bg-none
    mx-auto
    h-full
    xl:px-20
    md:px-10
    px-4
    '
        >
            {children}
        </div>
    );
};

export default Container;
