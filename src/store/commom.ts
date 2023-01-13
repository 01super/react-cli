import { createContainer } from 'unstated-next';
import { useLocalStorageState } from 'ahooks';

interface UserInfo {
    name: string;
}

const useCommonState = () => {
    const [userInfo, setUserInfo] = useLocalStorageState<UserInfo>('userInfo', {
        defaultValue: {
            name: '',
        },
    });
    return { userInfo, setUserInfo };
};

export default createContainer(useCommonState);
