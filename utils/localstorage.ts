"use client"

export const getFromLocalstorage = (name: string) => {
    return JSON.parse(localStorage.getItem(name) as string);
}

export const setInLocalstorage = (name: string, object: any) => {
    return localStorage.setItem(name, JSON.stringify(object))
}