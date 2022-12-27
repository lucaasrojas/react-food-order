import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import MainProvider from "./store/MainProvider";

function App() {
    return (
        <MainProvider>
            <Header />
            <main>
                <Meals />
            </main>
        </MainProvider>
    );
}

export default App;
