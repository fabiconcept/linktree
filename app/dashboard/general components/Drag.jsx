"use client"
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Normal from '../general elements/draggables/Normal';

const DraggableList = ({ array }) => {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        setItems([...array]);
    }, [array]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const newItems = Array.from(items);
        const [removed] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, removed);

        setItems(newItems);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="draggable-list">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className='flex flex-col gap-8'>
                        {items.map((item, index) => (
                            <Normal item={item} index={index} key={index+Math.random()} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default DraggableList;