import React from "react"

interface Props {
    handleClick: () => void
    value: string
}

export const Square: React.FC<Props> = ({ handleClick, value}) => {

    const styles: React.CSSProperties = {
        background: 'lightblue',
        border: '2px solid darkblue',
        display: 'inline-block',
        fontSize: '30px',
        minHeight: '50px',
        minWidth: '50px',
        fontWeight: 'bold',
        cursor: 'pointer',
    }

    return (
        <button
            className="square"
            onClick={handleClick}
            style={styles}
        >
            {value}
        </button>
    )
}