import { Exercise } from "@/models"
import useMainStore from "@/store/MainStore"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"

export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1).optional(),
    per_page: z.coerce.number().default(10).optional(),
    sort: z.string().optional(),
    title: z.string().optional(),
    status: z.string().optional(),
    priority: z.string().optional(),
    from: z.string().optional(),
    to: z.string().optional(),
    operator: z.enum(["and", "or"]).optional(),
  })
export const useExerciseTable = () => {
    const searchParams = useSearchParams()
    // console.log(searchParams)
    // const search = searchParamsSchema.parse(searchParams)

    // const { page, per_page, sort, title, status, priority, operator, from, to } =  search
    const page = searchParams.get("page")
    const per_page = searchParams.get("per_page")
    const sort = searchParams.get("sort")
    const name = searchParams.get("name")
    const idRutine = searchParams.get("idRutine")

    // const status = searchParams.get("status")
    const exercises = useMainStore((state) => state.exercises)
    const [data, setdata] = useState<Exercise[]>([])
    const [pageCount, setpageCount] = useState(0)
    useEffect(() => {
        let newData=exercises
        if (name) {
            newData = exercises.filter((exercise) => exercise.name.toLowerCase().includes(name.toLowerCase()))
        }
        if (idRutine) {
            newData = exercises.filter((exercise) => idRutine.includes(exercise.idRutine))
        }
        if (page && per_page) {
            newData = newData.slice((+page - 1) * +per_page, +page * +per_page)
        }
        // if (status) {
        //     newData.push(...exercises.filter((exercise) => exercise.active === status))
        // }
        // if (priority) {
        //     newData.push(...exercises.filter((exercise) => exercise.idRutines.includes(priority)))
        // }
        // if (from && to) {
        //     newData.push(...exercises.filter((exercise) => exercise.idRutines.includes(priority)))
        // }
        // if (operator) {
        //     newData.push(...exercises.filter((exercise) => exercise.idRutines.includes(priority)))
        // }
        // if (sort) {
        //     newData.push(...exercises.filter((exercise) => exercise.idRutines.includes(priority)))
        // }
        setpageCount(newData.length)
        console.log({name})
        console.log({newData})
        setdata(newData)
    }, [exercises, idRutine, name, page, per_page])
    
    return { data, pageCount }
} 