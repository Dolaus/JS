import React from 'react';

interface CommentPageProps {
    id: number;
}

const CommentPage: React.FC<CommentPageProps> = ({id}) => {

    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
};

export default CommentPage;