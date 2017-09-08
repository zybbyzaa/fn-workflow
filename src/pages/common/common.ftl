<#ftl strip_whitespace=true>

<#--
 * message as m
 *
 * Macro to translate a message code into a message.
 -->
<#macro m code>${springMacroRequestContext.getMessage(code)}</#macro>

<#--
 * messageText as mt
 *
 * Macro to translate a message code into a message,
 * using the given default text if no message found.
 -->
<#macro mt code, text>${springMacroRequestContext.getMessage(code, text)}</#macro>

<#--
 * messageArgs as ma
 *
 * Macro to translate a message code with arguments into a message.
 -->
<#macro ma code, args>${springMacroRequestContext.getMessage(code, args)}</#macro>

<#--
 * messageArgsText as mat
 *
 * Macro to translate a message code with arguments into a message,
 * using the given default text if no message found.
 -->
<#macro mat code, args, text>${springMacroRequestContext.getMessage(code, args, text)}</#macro>

<#--
 * theme
 *
 * Macro to translate a theme message code into a message.
 -->
<#macro theme code>${springMacroRequestContext.getThemeMessage(code)}</#macro>

<#--
 * themeText
 *
 * Macro to translate a theme message code into a message,
 * using the given default text if no message found.
 -->
<#macro themeText code, text>${springMacroRequestContext.getThemeMessage(code, text)}</#macro>

<#--
 * themeArgs
 *
 * Macro to translate a theme message code with arguments into a message.
 -->
<#macro themeArgs code, args>${springMacroRequestContext.getThemeMessage(code, args)}</#macro>

<#--
 * themeArgsText
 *
 * Macro to translate a theme message code with arguments into a message,
 * using the given default text if no message found.
 -->
<#macro themeArgsText code, args, text>${springMacroRequestContext.getThemeMessage(code, args, text)}</#macro>

<#--
 * url
 *
 * Takes a relative URL and makes it absolute from the server root by
 * adding the context root for the web application.
 -->
<#macro url relativeUrl>${springMacroRequestContext.getContextPath()}${relativeUrl}</#macro>

<#--
 * bind
 *
 * Exposes a BindStatus object for the given bind path, which can be
 * a bean (e.g. "person") to get global errors, or a bean property
 * (e.g. "person.name") to get field errors. Can be called multiple times
 * within a form to bind to multiple command objects and/or field names.
 *
 * This macro will participate in the default HTML escape setting for the given
 * RequestContext. This can be customized by calling "setDefaultHtmlEscape"
 * on the "springMacroRequestContext" context variable, or via the
 * "defaultHtmlEscape" context-param in web.xml (same as for the JSP bind tag).
 * Also regards a "htmlEscape" variable in the namespace of this library.
 *
 * Producing no output, the following context variable will be available
 * each time this macro is referenced (assuming you import this library in
 * your templates with the namespace 'spring'):
 *
 *   spring.status : a BindStatus instance holding the command object name,
 *   expression, value, and error messages and codes for the path supplied
 *
 * @param path : the path (string value) of the value required to bind to.
 *   Spring defaults to a command name of "command" but this can be overridden
 *   by user config.
 -->
<#macro bind path>
    <#if htmlEscape?exists>
        <#assign status = springMacroRequestContext.getBindStatus(path, htmlEscape)>
    <#else>
        <#assign status = springMacroRequestContext.getBindStatus(path)>
    </#if>
    <#-- assign a temporary value, forcing a string representation for any
    kind of variable. This temp value is only used in this macro lib -->
    <#if status.value?exists && status.value?is_boolean>
        <#assign stringStatusValue=status.value?string>
    <#else>
        <#assign stringStatusValue=status.value?default("")>
    </#if>
</#macro>

<#--
 * bindEscaped
 *
 * Similar to spring:bind, but takes an explicit HTML escape flag rather
 * than relying on the default HTML escape setting.
 -->
<#macro bindEscaped path, htmlEscape>
    <#assign status = springMacroRequestContext.getBindStatus(path, htmlEscape)>
    <#-- assign a temporary value, forcing a string representation for any
    kind of variable. This temp value is only used in this macro lib -->
    <#if status.value?exists && status.value?is_boolean>
        <#assign stringStatusValue=status.value?string>
    <#else>
        <#assign stringStatusValue=status.value?default("")>
    </#if>
</#macro>

<#--
 * formInput
 *
 * Display a form input field of type 'text' and bind it to an attribute
 * of a command or bean.
 *
 * @param path the name of the field to bind to
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
 -->
<#macro formInput path attributes="" fieldType="text">
    <@bind path/>
    <input type="${fieldType}" id="${status.expression}" name="${status.expression}" value="<#if fieldType!="password">${stringStatusValue}</#if>" ${attributes}<@closeTag/>
</#macro>

<#--
 * formPasswordInput
 *
 * Display a form input field of type 'password' and bind it to an attribute
 * of a command or bean. No value will ever be displayed. This functionality
 * can also be obtained by calling the formInput macro with a 'type' parameter
 * of 'password'.
 *
 * @param path the name of the field to bind to
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
 -->
<#macro formPasswordInput path attributes="">
    <@formInput path, attributes, "password"/>
</#macro>

<#--
 * formHiddenInput
 *
 * Generate a form input field of type 'hidden' and bind it to an attribute
 * of a command or bean. This functionality can also be obtained by calling
 * the formInput macro with a 'type' parameter of 'hidden'.
 *
 * @param path the name of the field to bind to
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
 -->
<#macro formHiddenInput path attributes="">
    <@formInput path, attributes, "hidden"/>
</#macro>

<#--
 * formTextarea
 *
 * Display a text area and bind it to an attribute of a command or bean.
 *
 * @param path the name of the field to bind to
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
 -->
<#macro formTextarea path attributes="">
    <@bind path/>
    <textarea id="${status.expression}" name="${status.expression}" ${attributes}>${stringStatusValue}</textarea>
</#macro>

<#--
 * formSingleSelect
 *
 * Show a selectbox (dropdown) input element allowing a single value to be chosen
 * from a list of options.
 *
 * @param path the name of the field to bind to
 * @param options a map (value=label) of all the available options
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
-->
<#macro formSingleSelect path options attributes="">
    <@bind path/>
    <select id="${status.expression}" name="${status.expression}" ${attributes}>
        <#if options?is_hash>
            <#list options?keys as value>
            <option value="${value?html}"<@checkSelected value/>>${options[value]?html}</option>
            </#list>
        <#else> 
            <#list options as value>
            <option value="${value?html}"<@checkSelected value/>>${value?html}</option>
            </#list>
        </#if>
    </select>
</#macro>

<#--
 * formMultiSelect
 *
 * Show a listbox of options allowing the user to make 0 or more choices from
 * the list of options.
 *
 * @param path the name of the field to bind to
 * @param options a map (value=label) of all the available options
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
-->
<#macro formMultiSelect path options attributes="">
    <@bind path/>
    <select multiple="multiple" id="${status.expression}" name="${status.expression}" ${attributes}>
        <#list options?keys as value>
        <#assign isSelected = contains(status.value?default([""]), value)>
        <option value="${value?html}"<#if isSelected> selected="selected"</#if>>${options[value]?html}</option>
        </#list>
    </select>
</#macro>

<#--
 * formRadioButtons
 *
 * Show radio buttons.
 *
 * @param path the name of the field to bind to
 * @param options a map (value=label) of all the available options
 * @param separator the html tag or other character list that should be used to
 *    separate each option. Typically '&nbsp;' or '<br>'
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
-->
<#macro formRadioButtons path options separator attributes="">
    <@bind path/>
    <#list options?keys as value>
    <#assign id="${status.expression}${value_index}">
    <input type="radio" id="${id}" name="${status.expression}" value="${value?html}"<#if stringStatusValue == value> checked="checked"</#if> ${attributes}<@closeTag/>
    <label for="${id}">${options[value]?html}</label>${separator}
    </#list>
</#macro>

<#--
 * formCheckboxes
 *
 * Show checkboxes.
 *
 * @param path the name of the field to bind to
 * @param options a map (value=label) of all the available options
 * @param separator the html tag or other character list that should be used to
 *    separate each option. Typically '&nbsp;' or '<br>'
 * @param attributes any additional attributes for the element (such as class
 *    or CSS styles or size
-->
<#macro formCheckboxes path options separator attributes="">
    <@bind path/>
    <#list options?keys as value>
    <#assign id="${status.expression}${value_index}">
    <#assign isSelected = contains(status.value?default([""]), value)>
    <input type="checkbox" id="${id}" name="${status.expression}" value="${value?html}"<#if isSelected> checked="checked"</#if> ${attributes}<@closeTag/>
    <label for="${id}">${options[value]?html}</label>${separator}
    </#list>
    <input type="hidden" name="_${status.expression}" value="on"/>
</#macro>

<#--
 * showErrors
 *
 * Show validation errors for the currently bound field, with
 * optional style attributes.
 *
 * @param separator the html tag or other character list that should be used to
 *    separate each option. Typically '<br>'.
 * @param classOrStyle either the name of a CSS class element (which is defined in
 *    the template or an external CSS file) or an inline style. If the value passed in here
 *    contains a colon (:) then a 'style=' attribute will be used, else a 'class=' attribute
 *    will be used.
-->
<#macro showErrors separator classOrStyle="">
    <#list status.errorMessages as error>
    <#if classOrStyle == "">
        <b>${error}</b>
    <#else>
        <#if classOrStyle?index_of(":") == -1><#assign attr="class"><#else><#assign attr="style"></#if>
        <span ${attr}="${classOrStyle}">${error}</span>
    </#if>
    <#if error_has_next>${separator}</#if>
    </#list>
</#macro>

<#--
 * checkSelected
 *
 * Check a value in a list to see if it is the currently selected value.
 * If so, add the 'selected="selected"' text to the output.
 * Handles values of numeric and string types.
 * This function is used internally but can be accessed by user code if required.
 *
 * @param value the current value in a list iteration
-->
<#macro checkSelected value>
    <#if stringStatusValue?is_number && stringStatusValue == value?number>selected="selected"</#if>
    <#if stringStatusValue?is_string && stringStatusValue == value>selected="selected"</#if>
</#macro>

<#--
 * contains
 *
 * Macro to return true if the list contains the scalar, false if not.
 * Surprisingly not a FreeMarker builtin.
 * This function is used internally but can be accessed by user code if required.
 *
 * @param list the list to search for the item
 * @param item the item to search for in the list
 * @return true if item is found in the list, false otherwise
-->
<#function contains list item>
    <#list list as nextInList>
    <#if nextInList == item><#return true></#if>
    </#list>
    <#return false>
</#function>

<#--
 * closeTag
 *
 * Simple macro to close an HTML tag that has no body with '>' or '/>',
 * depending on the value of a 'xhtmlCompliant' variable in the namespace
 * of this library.
-->
<#macro closeTag>
    <#if xhtmlCompliant?exists && xhtmlCompliant>/><#else>></#if>
</#macro>

<#macro format phone>
	<#if phone?? && phone?length == 11>${phone[0..2]}****${phone[7..10]}<#else>${phone!''}</#if>
</#macro>
<#macro substr str length>
	<#if (str?? && str?length > length)>
		${str?substring(0,length)}...
	<#else>
	${str!''}
	</#if>
</#macro>
<#macro mysubstring str length><#if (str?? && str?length > length)><#assign left = str?length - length /><#assign right = str?length />${str?substring(left,right)}<#else>${str!''}</#if></#macro>
<#macro hidestring str prelength suflength>
	<#if (str?? && (str?length > (prelength + suflength)))>
		<#assign left = str?length - suflength />
		<#assign right = str?length />
		${str?substring(0,prelength)}****${str?substring(left,right)}
	<#else>
		${str!''}
	</#if>
</#macro> 
<#macro bank code>
<#if code??>
	<#if code == "BOCO">交通银行
	<#elseif code == "CEB">光大银行
	<#elseif code == "SPDB">上海浦东发展银行
	<#elseif code == "ABC">农业银行
	<#elseif code == "ECITIC">中信银行
	<#elseif code == "CCB">建设银行
	<#elseif code == "CMBC">民生银行
	<#elseif code == "SDB">平安银行
	<#elseif code == "PSBC">中国邮政储蓄
	<#elseif code == "CMBCHINA">招商银行
	<#elseif code == "CIB">兴业银行
	<#elseif code == "ICBC">中国工商银行
	<#elseif code == "BOC">中国银行
	<#elseif code == "BCCB">北京银行
	<#elseif code == "GDB">广发银行
	<#elseif code == "HX">华夏银行
	<#elseif code == "XAYH">西安市商业银行
	<#elseif code == "SHYH">上海银行
	<#elseif code == "TJYH">天津市商业银行
	<#elseif code == "SZNCSYYH">深圳农村商业银行
	<#elseif code == "BJNCSYYH">北京农商银行
	<#elseif code == "HZYH">杭州市商业银行
	<#elseif code == "KLYH">昆仑银行
	<#elseif code == "ZHENGZYH">郑州银行
	<#elseif code == "WZYH">温州银行</#if>
</#if>
</#macro>

<#macro southernbank code>
<#if code??>
	<#if code == "102">中国工商银行
	<#elseif code == "307">深圳发展银行
	<#elseif code == "103">中国农业银行
	<#elseif code == "105">中国建设银行
	<#elseif code == "104">中国银行
	<#elseif code == "308">招商银行
	<#elseif code == "301">交通银行
	<#elseif code == "306">广东发展银行
	<#elseif code == "310">上海浦东发展银行
	<#elseif code == "305">中国民生银行
	<#elseif code == "302">中信银行
	<#elseif code == "303">中国光大银行
	<#elseif code == "309">兴业银行
	<#elseif code == "304">华夏银行
	<#elseif code == "313">城市商业银行
	<#elseif code == "402">农村信用合作社
	<#elseif code == "403">中国邮政储蓄银行
	<#elseif code == "314">农村商业银行
	<#elseif code == "319">徽商银行
	<#elseif code == "318">渤海银行
	<#elseif code == "316">浙商银行
	<#elseif code == "531">花旗银行
	<#elseif code == "671">渣打银行
	<#elseif code == "501">汇丰银行
	<#elseif code == "317">天津农村合作银行
	<#elseif code == "561">三菱东京日联银行
	<#elseif code == "203">中国农业发展银行
	<#elseif code == "564">日本瑞穗实业银行
	<#elseif code == "315">恒丰银行
	<#elseif code == "712">德意志银行股份
	<#elseif code == "401">城市信用合作社
	<#elseif code == "787">华一银行
	<#elseif code == "502">东亚银行
	<#elseif code == "510">永亨银行
	<#elseif code == "532">美国银行
	<#elseif code == "509">星展银行
	<#elseif code == "504">恒生银行</#if>
</#if>
</#macro>

<#macro rechargelimit code>
<#if code??>
	快捷支付&nbsp;&nbsp;<#if code == "CEB">光大银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "SPDB">浦发银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "ABC">农业银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "ECITIC">中信银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "CCB">建设银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "CMBC">民生银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "PSBC">中国邮政储蓄：单笔限额8000元，每日限额8000元，每月限额100000元
	<#elseif code == "CMBCHINA">招商银行：单笔限额50000元，每日限额50000元，每月限额100000元
	<#elseif code == "CIB">兴业银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "ICBC">中国工商银行：单笔限额10000元，每日限额20000元，每月限额20000元
	<#elseif code == "BOC">中国银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "GDB">广发银行：单笔限额50000元，每日限额100000元，每月限额100000元
	<#elseif code == "HX">华夏银行：单笔限额50000元，每日限额100000元，每月限额100000元
	</#if>
</#if>
</#macro>

<#macro tab_rechargelimit code>
<#if code??>
	<#if code == "CEB"><td  align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "SPDB"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "ABC"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "ECITIC"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "CCB"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "CMBC"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "PSBC"><td align="center">8000</td><td align="center">8000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "CMBCHINA"><td align="center">50000</td><td align="center">50000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "CIB"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "ICBC"><td align="center">10000</td><td align="center">20000</td><td align="center">20000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "BOC"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "GDB"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	<#elseif code == "HX"><td align="center">50000</td><td align="center">100000</td><td align="center">100000</td><td align="center">实际限额由客户自行设定</td>
	</#if>
</#if>
</#macro>

<#macro formatAmount num><#if num??>${num?string(',##0.00')}<#else>0.00</#if></#macro>
<#macro formatAmount4 num><#if num??>${num?string(',##0.0000')}<#else>0.0000</#if></#macro>
<#macro formatAmount0 num><#if num??>${num?string(',##0')}<#else>0</#if></#macro>
<#function objectToJsonFunction object>

    <#if object??>

        <#if object?is_enumerable>

            <#local json = '['>

            <#list object as item>

                <#if item?is_hash> 

                    <#if item_index &gt; 0 && json != "[" >

                        <#local json = json +',' >

                    </#if>

                    <#local json = json + objectToJsonFunction(item)>

                </#if>

            </#list>

            <#return json + ']'>

        <#elseif object?is_hash>

            <#local json = "{">

            <#assign keys = object?keys>

            <#list keys as key>

                <#if object[key]?? && !(object[key]?is_method) && key != "class">

                    <#if object[key]?is_number>

                        <#if key_index &gt; 0 && json != "{" >

                            <#local json = json +',' >

                        </#if>

                        <#local json = json + '"${key}": ${object[key]}'>

                    <#elseif object[key]?is_string>

                        <#if key_index &gt; 0 && json != "{" >

                            <#local json = json +',' >

                        </#if>

                      <#local json = json + '"${key}": "${object[key]?html!""?js_string}"'>

                    <#elseif object[key]?is_boolean >

                        <#if key_index &gt; 0 && json != "{" >

                            <#local json = json +',' >

                        </#if>

                        <#local json = json + '"${key}": ${object[key]?string("true", "false")}'>





                    <#elseif object[key]?is_enumerable >

                        <#if key_index &gt; 0 && json != "{" >

                            <#local json = json +',' >

                        </#if>

                        <#local json = json + '"${key}":'+ objectToJsonFunction(object[key])>





                    <#elseif object[key]?is_hash>

                        <#if key_index &gt; 0 && json != "{" >

                            <#local json = json +',' >

                        </#if>

                        <#local json = json + '"${key}":'+ objectToJsonFunction(object[key])>

                    </#if>

                </#if>

            </#list>

            <#return json +"}">

        </#if>

    <#else>

        <#return "{}">

    </#if>

</#function>