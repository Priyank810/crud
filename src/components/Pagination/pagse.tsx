const Pagination = (props:any) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
    <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <button onClick={() => props.paginate(number)} className='page-link'>
                {number}
              </button>
            </li>
          ))}
        </ul>
    </nav>
    )
}

export default Pagination
