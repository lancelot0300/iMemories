import { useAppDispatch, useAppSelector } from "../../state/store"
import { Status, StatusFileName, StatusesWrapper } from './statuses.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { removeFileStatus } from '../../state/features/requests/requestsSlice';

function Statuses() {

  const { activeRequests } = useAppSelector((state) => state.activeRequests);
  const dispatch = useAppDispatch();

   const handleCloseClick = (index: string) => {
        dispatch(removeFileStatus(index));
    }

    
    return (
        
        <StatusesWrapper>
            {activeRequests.map((request, index) => (
                <Status key={index} $status={request.status}>
                    <StatusFileName>{request.fileName}</StatusFileName>
                    <p>{request.progress}</p>
                    <FontAwesomeIcon icon={faCircleXmark} onClick={() => handleCloseClick(request.index)} style={{cursor: "pointer"}} />
                </Status>
            ))}
        </StatusesWrapper>
    )
}

export default Statuses