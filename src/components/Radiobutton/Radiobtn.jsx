import React, { useState } from 'react';
import { Radio, Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { useDispatch } from 'react-redux';
import { SetDays } from '../../redux/actions/radioBtnSlice';

const Radiobtn = ({propdata}) => {
   
    const [selectedValue, setSelectedValue] = useState(null);
    const dispatch = useDispatch()

    const handleRadioChange = (value) => {
        // Handle the selected value, you can update state or call an API here
        setSelectedValue(value);
        dispatch(SetDays(value))

        // Example: Call an API with the selected value
        // makeApiCall(value);
    };

    console.log("Selected Radio Btn Value is", selectedValue)
    return (
        <div className='container'>
            <Card className='bg-white'>
                <h1 className='text-center items-center py-1 mt-2'>{propdata}</h1>
            
                <hr />
                <List>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-react"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="vertical-list-react"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                    checked={selectedValue === '30'}
                                    onChange={() => handleRadioChange('30')}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                30 Days
                            </Typography>
                        </label>
                    </ListItem>
                    {/* Similar code for other options */}
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-vue"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="vertical-list-vue"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                    checked={selectedValue === '60'}
                                    onChange={() => handleRadioChange('60')}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                60 Days
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-svelte"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="vertical-list-svelte"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                    checked={selectedValue === '90'}
                                    onChange={() => handleRadioChange('90')}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                90 Days
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-svelte"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="vertical-list-svelte"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                    checked={selectedValue === '120'}
                                    onChange={() => handleRadioChange('120')}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                120 Days
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-svelte"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="vertical-list-svelte"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                    checked={selectedValue === '180'}
                                    onChange={() => handleRadioChange('180')}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                180 Days
                            </Typography>
                        </label>
                    </ListItem>
                    <ListItem className="p-0">
                        <label
                            htmlFor="vertical-list-svelte"
                            className="flex w-full cursor-pointer items-center px-3 py-2"
                        >
                            <ListItemPrefix className="mr-3">
                                <Radio
                                    name="vertical-list"
                                    id="vertical-list-svelte"
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0",
                                    }}
                                    checked={selectedValue === '181'}
                                    onChange={() => handleRadioChange('181')}
                                />
                            </ListItemPrefix>
                            <Typography
                                color="blue-gray"
                                className="font-medium text-blue-gray-400"
                            >
                                Older
                            </Typography>
                        </label>
                    </ListItem>
                </List>
            </Card>
        </div>
    )
}

export default Radiobtn