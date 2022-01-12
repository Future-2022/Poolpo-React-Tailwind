import React from 'react'

import paginationleft from '../../img/pagination-left.png';
import paginationright from '../../img/pagination-right.png';


const PressPagination = (props) => {
    return (
        <div className="relative pb-5 z-20">
            {props.page === 0 &&
                <div className="flex items-center">
                    <img src={paginationright} alt="" className="cursor-pointer" onClick={() => props.setPage(props.page + 1)} />
                </div>
            }
            {props.page !== 0 && props.page < Math.ceil(props.list.length / 4) - 1 &&
                <div className="flex items-center">
                    <img src={paginationleft} alt="" className="mr-4 cursor-pointer" onClick={() => props.setPage(props.page - 1)} />
                    <img src={paginationright} alt="" className="cursor-pointer" onClick={() => props.setPage(props.page + 1)} />
                </div>
            }
            {props.page === Math.ceil(props.list.length / 4) - 1 &&
                <div className="flex items-center">
                    <img src={paginationleft} alt="" className="cursor-pointer" onClick={() => props.setPage(props.page - 1)} />
                </div>
            }
        </div>
    )
}

export default PressPagination;
