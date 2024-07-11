import React from "react";
import Container from "./Container";

const Header = () => {
    return (
        <nav
            className={`absolute top-0 w-full h-16 z-50 bg-none flex justify-center items-center p-5 text-white text-2xl font-semibold bg-primary-1000`}
        >
            <Container>
              WEATHER DASHBOARD
            </Container>
        </nav>
    );
};

export default Header;
