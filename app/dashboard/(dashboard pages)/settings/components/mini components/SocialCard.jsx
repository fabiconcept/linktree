"use client"
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import SocialElement from '../../elements/SocialElement';

const DraggableList = ({array}) => {
    const [items, setItems] = useState([...array]);

    const handleDragEnd = (result) => {
        if (!result.destination) return; // Item was dropped outside the list

        const updatedItems = Array.from(items);
        const [reorderedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, reorderedItem);

        setItems(updatedItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef} className='pl-4 grid gap-1'>
                        {items.map((item, index) => (
                            <SocialElement index={index} item={item} key={item.id} />
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;