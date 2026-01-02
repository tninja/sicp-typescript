// Multiple representations for abstract data

export type TaggedData = {
    tag: string;
    content: any;
};

export const attachTag = (tag: string, content: any): TaggedData => ({ tag, content });
export const typeTag = (datum: TaggedData) => datum.tag;
export const contents = (datum: TaggedData) => datum.content;

// Operation table
const operationTable = new Map<string, any>();

export const put = (op: string, types: string | string[], proc: any) => {
    const typeKey = Array.isArray(types) ? types.join(',') : types;
    operationTable.set(`${op}:${typeKey}`, proc);
};

export const get = (op: string, types: string | string[]) => {
    const typeKey = Array.isArray(types) ? types.join(',') : types;
    return operationTable.get(`${op}:${typeKey}`);
};

// Apply generic
export const applyGeneric = (op: string, ...args: TaggedData[]) => {
    const typeTags = args.map(typeTag);
    const proc = get(op, typeTags);
    if (proc) {
        return proc(...args.map(contents));
    }
    throw new Error(`No method for these types -- APPLY-GENERIC ${op} ${typeTags}`);
};

// Complex number packages
export const installRectangularPackage = () => {
    const realPart = (z: [number, number]) => z[0];
    const imagPart = (z: [number, number]) => z[1];
    const magnitude = (z: [number, number]) => Math.sqrt(z[0] * z[0] + z[1] * z[1]);
    const angle = (z: [number, number]) => Math.atan2(z[1], z[0]);
    const makeFromRealImag = (x: number, y: number) => [x, y];
    
    const tag = (x: any) => attachTag('rectangular', x);
    put('realPart', ['rectangular'], realPart);
    put('imagPart', ['rectangular'], imagPart);
    put('magnitude', ['rectangular'], magnitude);
    put('angle', ['rectangular'], angle);
    put('makeFromRealImag', ['rectangular'], (x: number, y: number) => tag(makeFromRealImag(x, y)));
};

export const installPolarPackage = () => {
    const magnitude = (z: [number, number]) => z[0];
    const angle = (z: [number, number]) => z[1];
    const realPart = (z: [number, number]) => magnitude(z) * Math.cos(angle(z));
    const imagPart = (z: [number, number]) => magnitude(z) * Math.sin(angle(z));
    const makeFromMagAng = (r: number, a: number) => [r, a];

    const tag = (x: any) => attachTag('polar', x);
    put('realPart', ['polar'], realPart);
    put('imagPart', ['polar'], imagPart);
    put('magnitude', ['polar'], magnitude);
    put('angle', ['polar'], angle);
    put('makeFromMagAng', ['polar'], (r: number, a: number) => tag(makeFromMagAng(r, a)));
};

// Generic selectors
export const realPart = (z: TaggedData) => applyGeneric('realPart', z);
export const imagPart = (z: TaggedData) => applyGeneric('imagPart', z);
export const magnitude = (z: TaggedData) => applyGeneric('magnitude', z);
export const angle = (z: TaggedData) => applyGeneric('angle', z);
