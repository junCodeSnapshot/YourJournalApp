import Loader from "react-loader-spinner"

export const LoadingScreen = () => {
    return (
        <div className='loading-container'>
            <div className='loading-mesage-container'>
                <h3>Loading Data</h3>
                <Loader
                    type="Bars"
                    color="#5C12B5"
                    height={150}
                    width={150}
                    timeout={12000} //3 secs
                />
            </div>
        </div>
    )
}
