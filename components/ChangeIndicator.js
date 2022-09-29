

const ChangeIndicator = ({ change }) => {
    const changeClass = change == 0 ? 'neutral' : change > 0 ? 'positive' : 'negative';

    return (
        <span style={{
            background: changeClass === 'neutral' ? 'gray' : changeClass !== 'positive' ? 'green' : 'red',
            borderRadius: 2,
            fontSize: 10,
            padding: '1px 5px',
            margin: '0 0.3rem',
            color: '#000',
        }}>
            {change == 0 ? '' : change > 0 ? '+' : '-'}
            <span
                style={{
                    fontWeight: 'bold',
                }}
            >
                {change}
            </span>
        </span>
    );
}

export default ChangeIndicator;