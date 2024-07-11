import { Spin, ConfigProvider } from "antd";
export default function Loading() {
    return (
        <div className='absolute w-full h-full items-center justify-center flex flex-col align-middle p-52'>
            <Spin tip='Loading' size='large' />
        </div>
    );
}
