import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Package,
    CheckCircle,
    Upload,
    Warehouse,
    Truck,
    Store,
    ImagePlus,
    ChevronLeft,
    ChevronRight,
    Check,
    ArrowRight
} from 'lucide-react';

import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const wizardSteps = [
    { id: 1, title: 'المعلومات', icon: Package },
    { id: 2, title: 'الحالة', icon: CheckCircle },
    { id: 3, title: 'الصور', icon: ImagePlus },
    { id: 4, title: 'المواصفات', icon: Package },
    { id: 5, title: 'طريقة البيع', icon: Truck },
    { id: 6, title: 'المخزون', icon: Warehouse },
    { id: 7, title: 'التسعير', icon: Package },
];

const sellingMethods = [
    {
        id: 'platform_full',
        title: 'بيع وشحن المنصة',
        subtitle: 'نحن نتولى التخزين والشحن والدعم',
        label: 'مخزون المنصة',
        icon: Warehouse,
        color: 'blue'
    },
    {
        id: 'platform_ship',
        title: 'شحن المنصة',
        subtitle: 'احتفظ بالمخزون، نحن نستلم الطلبات',
        label: 'مخزون التاجر',
        icon: Truck,
        color: 'sky'
    },
    {
        id: 'self_ship',
        title: 'شحن ذاتي',
        subtitle: 'أنت تتولى التخزين والشحن',
        label: 'مخزون التاجر',
        icon: Store,
        color: 'purple'
    },
];

export default function AddProduct() {
    const navigate = useNavigate();
    const [wizardStep, setWizardStep] = useState(1);
    const [selectedSellingMethod, setSelectedSellingMethod] = useState('platform_full');
    const [selectedCondition, setSelectedCondition] = useState('new');

    const handleCancel = () => {
        navigate('/products');
    };

    const handleSave = () => {
        // TODO: Save product logic
        navigate('/products');
    };

    return (
        <div className="flex flex-col gap-6 min-h-full">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleCancel}
                        className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
                    >
                        <ArrowRight size={20} />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">إضافة منتج جديد</h2>
                        <p className="text-sm text-slate-500 mt-1">الخطوة {wizardStep} من 7</p>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="py-5">
                    <div className="flex items-center justify-between max-w-4xl mx-auto">
                        {wizardSteps.map((step, idx) => {
                            const StepIcon = step.icon;
                            const isActive = wizardStep === step.id;
                            const isCompleted = wizardStep > step.id;
                            return (
                                <div key={step.id} className="flex items-center">
                                    <div className="flex flex-col items-center">
                                        <button
                                            onClick={() => setWizardStep(step.id)}
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isCompleted ? 'bg-emerald-500 text-white' :
                                                    isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' :
                                                        'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                                }`}
                                        >
                                            {isCompleted ? <Check size={20} /> : <StepIcon size={20} />}
                                        </button>
                                        <span className={`text-xs mt-2 font-medium ${isActive ? 'text-blue-600' : isCompleted ? 'text-emerald-600' : 'text-slate-400'
                                            }`}>
                                            {step.title}
                                        </span>
                                    </div>
                                    {idx < wizardSteps.length - 1 && (
                                        <div className={`w-16 h-1 mx-3 rounded-full ${wizardStep > step.id ? 'bg-emerald-500' : 'bg-slate-200'
                                            }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* Content Area */}
            <Card className="bg-white border-slate-200 shadow-sm flex-1">
                <CardContent className="p-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Step 1: Basic Info */}
                        {wizardStep === 1 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">المعلومات الأساسية</h3>
                                    <p className="text-slate-500">أدخل البيانات الأساسية للمنتج</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">اسم المنتج *</Label>
                                        <Input placeholder="مثال: هاتف سامسونج Galaxy S24" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">العلامة التجارية *</Label>
                                        <Input placeholder="مثال: Samsung" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">الفئة الرئيسية *</Label>
                                        <Select>
                                            <SelectTrigger className="h-11"><SelectValue placeholder="اختر الفئة" /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="phones">هواتف</SelectItem>
                                                <SelectItem value="audio">سماعات</SelectItem>
                                                <SelectItem value="wearables">ساعات ذكية</SelectItem>
                                                <SelectItem value="accessories">اكسسوارات</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">كود SKU *</Label>
                                        <Input placeholder="XXX-XXX-XXX" className="h-11 font-mono" />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label className="text-slate-700">وصف المنتج *</Label>
                                        <Textarea placeholder="اكتب وصف تفصيلي للمنتج يشرح مميزاته وخصائصه..." rows={5} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Condition */}
                        {wizardStep === 2 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">حالة المنتج</h3>
                                    <p className="text-slate-500">حدد حالة المنتج الذي تريد إضافته</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div
                                        onClick={() => setSelectedCondition('new')}
                                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${selectedCondition === 'new'
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-slate-200 bg-white hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedCondition === 'new' ? 'border-blue-600' : 'border-slate-300'
                                                }`}>
                                                {selectedCondition === 'new' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                                            </div>
                                            <span className="font-semibold text-lg text-slate-900">جديد</span>
                                        </div>
                                        <p className="text-slate-600">منتج لم يستخدم من قبل، في حالته الأصلية مع الضمان</p>
                                    </div>
                                    <div
                                        onClick={() => setSelectedCondition('used')}
                                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${selectedCondition === 'used'
                                                ? 'border-blue-600 bg-blue-50'
                                                : 'border-slate-200 bg-white hover:border-slate-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedCondition === 'used' ? 'border-blue-600' : 'border-slate-300'
                                                }`}>
                                                {selectedCondition === 'used' && <div className="w-3 h-3 rounded-full bg-blue-600" />}
                                            </div>
                                            <span className="font-semibold text-lg text-slate-900">مستعمل</span>
                                        </div>
                                        <p className="text-slate-600">منتج تم استخدامه سابقاً بحالة جيدة</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Images */}
                        {wizardStep === 3 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">صور المنتج</h3>
                                    <p className="text-slate-500">أضف صور واضحة وعالية الجودة للمنتج (حتى 8 صور)</p>
                                </div>
                                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-16 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
                                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-5">
                                        <Upload size={32} className="text-blue-600" />
                                    </div>
                                    <p className="text-slate-900 font-semibold text-lg mb-2">اسحب الصور هنا أو اضغط للرفع</p>
                                    <p className="text-sm text-slate-500">PNG, JPG, WEBP حتى 5MB لكل صورة</p>
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                                        <div key={i} className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 hover:border-slate-300 hover:text-slate-400 cursor-pointer transition-colors">
                                            <ImagePlus size={28} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 4: Specifications */}
                        {wizardStep === 4 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">مواصفات المنتج</h3>
                                    <p className="text-slate-500">أضف المواصفات التقنية والأبعاد</p>
                                </div>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-slate-700">الوزن (كجم)</Label>
                                            <Input type="number" placeholder="0.0" className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-700">الطول (سم)</Label>
                                            <Input type="number" placeholder="0" className="h-11" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-slate-700">العرض (سم)</Label>
                                            <Input type="number" placeholder="0" className="h-11" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">المواصفات الإضافية</Label>
                                        <Textarea placeholder="أضف أي مواصفات إضافية للمنتج مثل اللون، المادة، الميزات الخاصة..." rows={5} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 5: Selling Method */}
                        {wizardStep === 5 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">طريقة البيع والشحن</h3>
                                    <p className="text-slate-500">اختر كيف تريد بيع وشحن هذا المنتج</p>
                                </div>
                                <div className="grid grid-cols-3 gap-5">
                                    {sellingMethods.map((method) => {
                                        const MethodIcon = method.icon;
                                        const isSelected = selectedSellingMethod === method.id;
                                        return (
                                            <div
                                                key={method.id}
                                                onClick={() => setSelectedSellingMethod(method.id)}
                                                className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${isSelected
                                                        ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-100'
                                                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                                                    }`}
                                            >
                                                {isSelected && (
                                                    <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center">
                                                        <Check size={16} className="text-white" />
                                                    </div>
                                                )}
                                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 ${isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'
                                                    }`}>
                                                    <MethodIcon size={32} />
                                                </div>
                                                <h5 className="font-bold text-lg text-slate-900 mb-2">{method.title}</h5>
                                                <p className="text-sm text-slate-500 mb-4">{method.subtitle}</p>
                                                <Badge variant="secondary" className={isSelected ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'}>
                                                    {method.label}
                                                </Badge>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Step 6: Inventory */}
                        {wizardStep === 6 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">إدارة المخزون</h3>
                                    <p className="text-slate-500">حدد الكمية المتوفرة وإعدادات التنبيهات</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">الكمية المتوفرة *</Label>
                                        <Input type="number" placeholder="0" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">حد التنبيه (منخفض المخزون)</Label>
                                        <Input type="number" placeholder="10" className="h-11" />
                                    </div>
                                </div>
                                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                    <p className="text-sm text-amber-800">
                                        💡 سيتم تنبيهك عندما ينخفض المخزون عن الحد المحدد
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Step 7: Pricing */}
                        {wizardStep === 7 && (
                            <div className="space-y-6">
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">التسعير</h3>
                                    <p className="text-slate-500">حدد سعر البيع وحدود الطلب</p>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">السعر (ج.م) *</Label>
                                        <Input type="number" placeholder="0.00" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">سعر قبل الخصم (اختياري)</Label>
                                        <Input type="number" placeholder="0.00" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">الحد الأدنى للطلب</Label>
                                        <Input type="number" placeholder="1" className="h-11" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-slate-700">الحد الأقصى للطلب</Label>
                                        <Input type="number" placeholder="100" className="h-11" />
                                    </div>
                                </div>
                                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                                    <p className="text-sm text-emerald-800">
                                        ✅ المنتج جاهز للنشر بعد الحفظ
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Footer Actions */}
            <Card className="bg-white border-slate-200 shadow-sm">
                <CardContent className="py-4">
                    <div className="flex items-center justify-between">
                        <Button
                            variant="outline"
                            onClick={() => wizardStep > 1 ? setWizardStep(wizardStep - 1) : handleCancel()}
                            className="gap-2 h-11 px-6"
                        >
                            <ChevronRight size={18} />
                            {wizardStep > 1 ? 'السابق' : 'إلغاء'}
                        </Button>
                        <Button
                            onClick={() => wizardStep < 7 ? setWizardStep(wizardStep + 1) : handleSave()}
                            className="bg-blue-600 hover:bg-blue-700 gap-2 h-11 px-6"
                        >
                            {wizardStep < 7 ? 'التالي' : 'حفظ المنتج'}
                            {wizardStep < 7 && <ChevronLeft size={18} />}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
