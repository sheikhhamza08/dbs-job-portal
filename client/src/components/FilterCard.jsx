import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { JOB_FILTER_OPTIONS } from '@/utils/jobFilters'


const FilterCard = () => {
    useGetAllJobs()

    const [selectedValue, setSelectedValue] = useState("");
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
    }


    useEffect(() => {
        // console.log(selectedValue);
        dispatch(setSearchedQuery(selectedValue))
    }, [selectedValue])

    return (
        <div className='w-full bg-white py-4 px-4 rounded-2xl border border-gray-100 shadow-sm'>
            <h1 className='font-bold text-lg text-[#002855]'>Filter Jobs</h1>
            <hr className='mt-3 mb-2 border-gray-100' />

            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    JOB_FILTER_OPTIONS.map((data, index) => (
                        <div key={data.filterType}>
                            <h1 className='font-semibold text-sm text-[#002855]/70 uppercase tracking-wide mt-3 mb-1'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `${data.filterType}-${idx}`
                                    return (
                                        <div className='flex items-center spac-x-2 gap-1 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className="text-base/5" htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )

                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>



        </div>
    )
}

export default FilterCard
