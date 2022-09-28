import { Card, Input } from 'antd';

const chunkSize = 10 * 1024 * 1024;

const LargeUpload = () => {
    const sliceFile = (file: File): Blob[] => {
        const fileChunkList: Blob[] = [];
        let current = 0;
        while (current < file.size) {
            const chunk = file.slice(current, current + chunkSize);
            fileChunkList.push(chunk);
            current += chunkSize;
        }
        return fileChunkList;
    };

    const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file: File = e.target.files![0];
        const fileChunkList = sliceFile(file);
        console.log('fileChunkList: ', fileChunkList);
    };

    return (
        <Card title="大文件上传">
            <div>hello</div>
            <Input type="file" onChange={handleFileChange} />
        </Card>
    );
};

export default LargeUpload;
