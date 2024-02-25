import { Accordion, AccordionContent, AccordionPanel, AccordionTitle } from 'flowbite-react';


const Faq = () => {
    return (
        <div className="flex flex-col gap-y-8 items-center">
            <div className="text-2xl font-medium mt-2">Frequently Asked Questions</div>
            <div className="flex flex-col gap-y-5 text-md w-4/5 mx-auto pb-6">
                <Accordion>
                    <AccordionPanel>
                        <AccordionTitle>Are these products original?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                All items offered by Smoothly Shopping are guaranteed to be authentic.
                                <br /><br />
                                Every product showcased on the Smoothly Shopping platform, whether on sale, promotion, or discount, is guaranteed to be genuine.
                                <br /><br />
                                The sale of counterfeit, pirated, or unlawfully reproduced goods on Smoothly Shopping is strictly prohibited.
                                <br /><br />
                                Sellers featured on the Smoothly Shopping platform undergo rigorous selection processes. Each of these vendors is committed to providing customers with authentic products.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>Do these products have warranties?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                All products available for purchase through Smoothly Shopping are covered by the warranties provided by official distributors, importers, or manufacturers.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                    <AccordionPanel>
                        <AccordionTitle>Can the price of the products change?</AccordionTitle>
                        <AccordionContent>
                            <p className="mb-2 text-gray-500 dark:text-gray-400">
                                Product prices on Smoothly Shopping may fluctuate for various reasons, including shifts in market conditions, seller decisions, currency exchange rates, and promotional campaigns.
                                <br/><br/>
                                Price adjustments reflecting market conditions<br/>
                                Variances in pricing from different sellers<br/>
                                Modifications to promotion durations or inventory levels<br/>
                                Price updates initiated by importing companies in response to currency fluctuations<br/>
                                Additional discounts applied to carts during promotional events.
                            </p>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>

            </div>
        </div>
    )
}

export default Faq