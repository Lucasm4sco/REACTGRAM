import { resetMessage as resetUserMessage } from "../slices/userSlice";
import { resetMessage as resetPhotoMessage } from "../slices/photoSlice";

export const useResetComponentMessage = (dispatch, type) => {
    if (type === 'photo')
        return () => {
            setTimeout(() => {
                dispatch(resetPhotoMessage())
            }, 1500)
        }

    if (type === 'user')
        return () => {
            setTimeout(() => {
                dispatch(resetUserMessage())
            }, 1500)
        }
}