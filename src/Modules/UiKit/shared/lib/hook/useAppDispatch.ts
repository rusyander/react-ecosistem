import { useDispatch } from 'react-redux';
import { AppDispatchUiKit } from '../../../app/providers/StoreProvider/config/store';

export const useAppDispatchUiKit: () => AppDispatchUiKit = useDispatch;
