import {Map as sut, MapData} from "../../../src/engine";
import {StubbedInstance, stubInterface} from "ts-sinon";
import {Event, Trigger} from "../../../src/engine/event";

describe('Map class test', () => {

    let mapData: StubbedInstance<MapData>
    /* @ts-expect-error ignore */
    let img: StubbedInstance<HTMLImageElement>;
    let event: StubbedInstance<Event>;
    let event2: StubbedInstance<Event>;
    let event3: StubbedInstance<Event>;

    beforeEach(() => {
        mapData = stubInterface<MapData>();
        event = stubInterface<Event>();
        event2 = stubInterface<Event>();
        event3 = stubInterface<Event>();
        /* @ts-expect-error ignore */
        img = {} as HTMLImageElement ;
    });
    it('Should return true if will collide', () => {
        const collisionCellX = 10;
        const collisionCellY = 30;
        const collisionCellPosition: [number, number] = [collisionCellX, collisionCellY];
        mapData.events = new Map<string, Event>();
        const instance = new sut(0, mapData, img);

        mapData.collisions = [collisionCellPosition];
        expect(instance.willCollide({x: collisionCellX, y: collisionCellY})).toBeTruthy();
    });

    it('Should return false if will not collide', () => {
        const collisionCellX = 10;
        const collisionCellY = 30;
        const collisionCellPosition: [number, number] = [collisionCellX, collisionCellY];
        mapData.events = new Map<string, Event>();
        const instance = new sut(0, mapData, img);

        mapData.collisions = [collisionCellPosition];
        expect(instance.willCollide({x: 9, y: 29})).toBeFalsy();
    });

    it('Should return true if has event in the given position', () => {
        const eventCellX = 10;
        const eventCellY = 30;
        mapData.events = new Map<string, Event>([[`${eventCellX},${eventCellY}`, event]]);
        const instance = new sut(0, mapData, img);
        expect(instance.hasEventAt({x: eventCellX, y: eventCellY})).toBeTruthy();
    });

    it('Should return false if has no event in the given position', () => {
        const eventCellX = 10;
        const eventCellY = 30;
        mapData.events = new Map<string, Event>([[`${eventCellX},${eventCellY}`, event]]);
        const instance = new sut(0, mapData, img);
        expect(instance.hasEventAt({x: 9, y: 29})).toBeFalsy();
    });

    it('Should return the correct event', () => {
        const eventCellX = 10;
        const eventCellY = 30;
        mapData.events = new Map<string, Event>([[`${eventCellX},${eventCellY}`, event]]);
        const instance = new sut(0, mapData, img);
        expect(instance.getEventAt({x: eventCellX, y: eventCellY})).toBeTruthy();
    });

    it('Should return null if there is no event in the given position', () => {
        const eventCellX = 10;
        const eventCellY = 30;
        mapData.events = new Map<string, Event>([[`${eventCellX},${eventCellY}`, event]]);
        const instance = new sut(0, mapData, img);
        expect(instance.getEventAt({x: 9, y: 29})).toBeNull();
    });
    
    it('Should restore all interactive permanent events', () => {
        event.isPermanent.returns(false);
        event.getTrigger.returns(Trigger.COLLISION);
        event2.isPermanent.returns(true);
        event2.getTrigger.returns(Trigger.INTERACT);
        event3.isPermanent.returns(false);
        event3.getTrigger.returns(Trigger.INTERACT);

        mapData.events = new Map<string, Event>([
            [`1,2`, event],
            [`1,3`, event2]
        ]);

        const instance = new sut(0, mapData, img);

        instance.restoreInteractiveEvents();
        expect(event.restore.callCount).toBe(0);
        expect(event2.restore.callCount).toBe(1);
        expect(event3.restore.callCount).toBe(0);
    });

    it('Should restore all collide permanent events', () => {
        event.isPermanent.returns(false);
        event.getTrigger.returns(Trigger.INTERACT);
        event2.isPermanent.returns(true);
        event2.getTrigger.returns(Trigger.COLLISION);
        event3.isPermanent.returns(false);
        event3.getTrigger.returns(Trigger.COLLISION);
        mapData.events = new Map<string, Event>([
            [`1,2`, event],
            [`1,3`, event2]
        ]);

        const instance = new sut(0, mapData, img);

        instance.restoreCollideEvents();
        expect(event.restore.callCount).toBe(0);
        expect(event2.restore.callCount).toBe(1);
        expect(event3.restore.callCount).toBe(0);
    });
});